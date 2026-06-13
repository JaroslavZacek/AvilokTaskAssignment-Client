import { useEffect, useState } from "react";

import { getComments, createComment } from "../../api/commentApi";

export default function TaskComments({ taskId, isTaskLeader }) {
    
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        loadComments();
    }, []);

    async function loadComments() {
        
        try {
            const data = await getComments(taskId)
            
            setComments(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    async function handleAddComment() {
        
        if (!newComment.trim()) {
            return;
        }

        try {
            await createComment(taskId, newComment);

            setNewComment("");

            await loadComments();
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="card-footer">
            <h5 className="mb-3">Komentáře</h5>

            {
                comments.length === 0
                ? (
                    <div className="text-muted mb-3">
                        Zatím žádné komentáře.
                    </div>
                )
                : (
                    comments.map(comment => (
                        <div key={comment.id} className="border rounded p-2 mb-2">
                            <div className="fw-bold">
                                {comment.authorName}
                            </div>

                            <div className="text-muted small mb-2">
                                {
                                    new Date(comment.createdAt).toLocaleDateString("cs-CZ")
                                }
                            </div>

                            <div>
                                {comment.text}
                            </div>
                        </div>
                    ))
                )
            }

            {
                isTaskLeader &&
                (
                    <div className="mt-3">

                        <textarea
                            className="form-control"
                            rows="3"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Napsat komentář..."
                        />

                        <button className="btn btn-primary mt-2" onClick={handleAddComment}>
                            Přidat komentář
                        </button>
                    </div>
                )
            }

            
        </div>
    );

}
