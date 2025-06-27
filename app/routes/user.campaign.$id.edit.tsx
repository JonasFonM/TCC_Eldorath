import { useEffect, useRef, useState } from "react";
import { Form, Link, NavLink, useNavigation, useOutletContext } from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/node";
import { getUserIdFromSession } from "~/utils/auth.server";
import { updateCampaignDescription } from "~/utils/campaign.server";
import { campaign } from "@prisma/client";

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const description = form.get('description') as string;
  const masterId = await getUserIdFromSession(request);
  const campaignId = Number(params.id)

  if (!masterId) {
    return json({ error: "Não autorizado" }, { status: 401 });;
  }

  if (!(description)) {
    return json({ error: "A Descrição não pode ser nula." }, { status: 400 });
  }

  try {
    return await updateCampaignDescription(description, campaignId);
  } catch (error) {
    console.error(error);
    return json({ error: "Impossível atualizar Campanha" }, { status: 500 });;
  }
}

export default function DescriptionEditor() {
  const { campaign, campaignId } = useOutletContext<{ campaign: campaign, campaignId: number }>()
  const transition = useNavigation();
  const isSubmitting = transition.state === "submitting";

  const formRef = useRef<HTMLFormElement>(null);

  const firstLoad = useRef(true);
  const [description, setDescription] = useState<string>(campaign.description);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setDescription(value);
  };

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  useEffect(() => {
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
      textarea.style.height = textarea.scrollHeight + "px";
      textarea.style.overflowY = "hidden";

      const handleInput = function (this: HTMLTextAreaElement) {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      };

      textarea.addEventListener("input", handleInput);

      return () => {
        textarea.removeEventListener("input", handleInput);
      };
    });
  }, []);

  return (
    <Form className="modal-overlay" style={{ display: 'flex' }} method="post" ref={formRef}>
      <div className="modal-content">
        <h1>Editando Descrição</h1>
        <input type="hidden" name="campaignId" value={campaignId} />

        <textarea
          className="title-input"
          name="description"
          placeholder="Escreva uma descrição para sua campanha..."
          required
          style={{
            paddingTop: '1%',
            overflowY: 'auto',
            wordBreak: 'break-word',
            resize: 'none',
            minHeight: '50vh',
            fontSize: '1.3rem',
            color: 'white',
            border: '0'
          }}
          onChange={handleChange}
          value={description}
          disabled={isSubmitting}
        />

        <button type="submit" disabled={isSubmitting}
          className="button"
          style={{ padding: '1%', width: "100%", fontSize: '1.4rem', maxHeight: '5%', marginTop: '0' }}
        >{isSubmitting ? "Enviando..." : "Enviar"}</button>

        <Link to={`..`}
          className="logout button"
          style={{ padding: '1%', width: "100%", fontSize: '1.4rem', maxHeight: '5%', marginTop: '0' }}
        >Cancelar</Link>

      </div>
    </Form>
  );
}
