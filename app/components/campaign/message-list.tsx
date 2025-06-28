import { message, user } from "@prisma/client";
import "~/styles.css";

interface Props {
    messages: (message & { user: user })[],
    masterId: number
}

export function MessageList({ messages, masterId }: Props) {
    return (
        <div style={{ flex: 1, overflowY: "auto", overflowX: 'hidden', padding: "1rem", maxHeight: '70vh' }}>
            {messages.length === 0 || !messages ? (
                <p style={{ fontStyle: "italic", color: "white" }}>Nenhuma mensagem ainda.</p>
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
                        <strong style={msg.userId === masterId ? { color: 'gold' } : {}}>{msg.user.username} {msg.userId === masterId ? '(Mestre)' : ''}</strong>
                        <p style={{ margin: "0.25rem 0", fontVariant: 'normal', wordBreak: 'break-word' }}>{msg.content}</p>
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
