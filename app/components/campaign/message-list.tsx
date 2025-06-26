import { message, user } from "@prisma/client";
import "~/styles.css";

interface Props {
    messages: (message & { user: user })[],
    masterId: number
}

export function MessageList({ messages, masterId }: Props) {
    return (
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem", marginBottom: '65%' }}>
            {messages.length === 0 ? (
                <p style={{ fontStyle: "italic", color: "#111" }}>Nenhuma mensagem ainda.</p>
            ) : (
                messages.map((msg) => (
                    <div
                        key={msg.id}
                        style={{
                            marginBottom: "1rem",
                            backgroundColor: "#111",
                            padding: "0.75rem",
                        }}
                    >
                        <strong style={msg.userId === masterId ? { color: 'gold' } : {}}>{msg.userId} {msg.userId === masterId ? '(Mestre)' : ''}</strong>
                        <p style={{ margin: "0.25rem 0", wordBreak: 'break-word' }}>{msg.content}</p>
                        <small style={{ color: "#888" }}>
                            {new Date(msg.createdAt).toLocaleString("pt-BR")}
                        </small>
                    </div>
                ))
            )
            }
        </div >
    )
}
