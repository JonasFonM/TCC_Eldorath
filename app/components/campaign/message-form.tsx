import { useEffect, useRef } from "react";
import { Form, useNavigation } from "@remix-run/react";

interface MessageFormProps {
  campaignId: number;
  userId: number;
}

export default function MessageForm({ campaignId, userId }: MessageFormProps) {
  const transition = useNavigation();
  const isSubmitting = transition.state === "submitting";

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (transition.state === "idle" && formRef.current) {
      formRef.current.reset();
    }
  }, [transition.state]);

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
    <Form method="post" ref={formRef}
      style={{ position: 'absolute', bottom: '0', width: '100%' }}>
      <input type="hidden" name="campaignId" value={campaignId} />
      <input type="hidden" name="userId" value={userId} />

      <textarea
        className="title-input"
        name="content"
        placeholder="Digite uma mensagem..."
        required
        maxLength={125}
        style={{ paddingTop: '1%', overflowY: 'auto', wordBreak: 'break-word', resize: 'none', fontSize: '1.1rem', marginBottom: '0' }}
        disabled={isSubmitting}
      />

      <button type="submit" disabled={isSubmitting}
        className="button"
        style={{ padding: '1%', width: "100%", fontSize: '1.4rem', maxHeight: '5%', marginTop: '0' }}

      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </Form>
  );
}
