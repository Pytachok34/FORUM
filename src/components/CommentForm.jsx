import React, {useRef, useState} from 'react';
import '../assets/CommentForm.css'

const CommentForm = ({ onAddComment, isAuthenticated }) => {
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [showAuthAlert, setShowAuthAlert] = useState(false);
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            setShowAuthAlert(true);
            return;
        }

        if (!content.trim() && files.length === 0) return;

        try {
            const formData = new FormData();
            formData.append('content', content);

            files.forEach(file => {
                formData.append('files', file);
            });

            await onAddComment(formData);
            setContent('');
            setFiles([]);
        } catch (error) {
            console.error('Ошибка при отправке комментария:', error);
        }
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles([...files, ...selectedFiles]);
    };

    const removeFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const closeAuthAlert = () => {
        setShowAuthAlert(false);
    };

    return (
        <div className="comment-form-container">
            {showAuthAlert && (
                <div className="auth-alert">
                    <div className="auth-alert-content">
                        <p>Чтобы оставить комментарий, пожалуйста, зарегистрируйтесь или войдите.</p>
                        <button onClick={closeAuthAlert}>Понятно</button>
                    </div>
                </div>
            )}

            <form className="comment-form" onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Напишите комментарий..."
                    rows="4"
                />

                <div className="file-attachments">
                    {files.map((file, index) => (
                        <div key={index} className="file-item">
                            <span>{file.name}</span>
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="remove-file"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={triggerFileInput}
                        className="attach-file-btn"
                    >
                        Прикрепить файл
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        style={{ display: 'none' }}
                    />
                    <button type="submit" className="submit-comment">
                        Добавить комментарий
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommentForm;