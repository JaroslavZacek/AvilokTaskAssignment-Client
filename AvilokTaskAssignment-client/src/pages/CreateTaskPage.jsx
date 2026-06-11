import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createTask } from "../api/taskApi";


export default function CreateTaskPage() {

    const navigate = useNavigate();

    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [workType, setWorkType] = useState(1);
    const [deadline, setDeadline] = useState("");

    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        try {
            await createTask({
                shortDescription,
                longDescription,
                workType: Number(workType),
                deadline
            });

            navigate("/");
        }
        catch (error) {

            console.error(error);

            setError("Nepodařilo se vytvořit zakázku.")
        }
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="mb-4">Nová zakázka</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Krátký popis</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={shortDescription}
                                        onChange={(e) => setShortDescription(e.target.value)}
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Popis</label>

                                    <textarea 
                                        className="form-control"
                                        rows="5"
                                        value={longDescription}
                                        onChange={(e) => setLongDescription(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Typ práce</label>

                                    <select
                                        className="form-select"
                                        value={workType}
                                        onChange={(e) => setWorkType(e.target.value)}
                                    >
                                        <option value={1}>Development</option>
                                        <option value={2}>Graphic</option>
                                        <option value={3}>Story</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Termín dokončení</label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                        required 
                                    />
                                </div>

                                {
                                    error &&
                                    (
                                        <div className="alert alert-danger">
                                            {error}
                                        </div>
                                    )
                                }

                                <button type="submit" className="btn btn-primary">
                                    Vytvořit zakázku
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}