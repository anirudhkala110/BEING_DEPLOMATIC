import React, { useRef, useState } from "react";
import Swal from "sweetalert2";

const FileUpload = () => {
    const fileInputRef = useRef(null);

    const [file, setFile] = useState(null);
    const [stat, setStat] = useState(1);
    const [amt, setAmt] = useState(null);
    const [reason, setReason] = useState(null);
    const [fileName, setFileName] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const [error, setError] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 1 * 1024 * 1024; // 1MB

    const validateFile = (file) => {
        if (!allowedTypes.includes(file.type)) {
            throw new Error("Invalid file type. Please upload JPEG, PNG or PDF files.");
        }
        if (file.size > maxSize) {
            throw new Error("File too large. Maximum size is 1MB.");
        }
    };

    const handleFile = (file) => {
        try {
            validateFile(file);

            setError("");
            setFile(file);
            setFileName(file.name);

            // IMAGE PREVIEW
            if (file.type.startsWith("image/")) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            } else {
                setPreviewUrl("");
            }

        } catch (err) {
            setError(err.message);
            setFile(null);
            setFileName("");
            setPreviewUrl("");

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) handleFile(file);
    };

    const formatFileSize = (bytes) =>
        bytes < 1024
            ? `${bytes} B`
            : bytes < 1024 * 1024
                ? `${(bytes / 1024).toFixed(1)} KB`
                : `${(bytes / 1024 / 1024).toFixed(2)} MB`;

 const handleSave = () => {
    if (amt === "" || amt === null || amt === undefined) {
        Swal.fire({
            icon: "warning",
            title: "Amount error",
            text: "Please enter the amount first",
        });
        return;
    }

        if (!reason || reason.trim() === "") {
        Swal.fire({
            icon: "warning",
            title: "Reason Error",
            text: `Please enter the ${stat ==1 ? 'reason for':'source of'} ${stat ==1 ? 'Expense..':'Revenue..'}`,
        });
        return;
    }

    if (!file || !amt || !reason) {
        Swal.fire({
            icon: "warning",
            title: "No file selected",
            text: "Please upload a file first",
        });
        return;
    }

    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to upload this file?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Upload",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: "success",
                title: "Uploaded!",
                text: "Your file has been uploaded successfully",
            });

            // 👉 call API here
        }
    });
};

    return (
        <div className="bg-white p-2">
            <div>
                <div className="my-1">
                    <button className={`w-50 btn rounded-0 shadow-sm border ${stat ==1 ? 'btn-primary':'btn-light'}`} onClick={e=>setStat(e=>1)}>Expense</button>
                    <button className={`w-50 btn rounded-0 shadow-sm border ${stat !=1 ? 'btn-primary':'btn-light'}`} onClick={e=>setStat(e=>2)}>Revenue</button>
                </div>
                {stat == 1 ? <div className="form border p-1 my-2 py-2 shadow-sm">
                <div class="form-group">
                    <label for="amount">Expence Amount</label>
                    <input type="number" class="form-control" id="amount" aria-describedby="amount" placeholder="Enter Spent Amount"  onChange={(e)=>setAmt(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="reason">Reason</label>
                    <input type="textarea" class="form-control" id="reason" placeholder="Reason for spending money (in 150 words)"  onChange={(e)=>setReason(e.target.value)}/>
                </div>
            </div>:<div className="form border p-1 my-2 py-2 shadow-sm">
                <div class="form-group">
                    <label for="amount">Revenue Amount</label>
                    <input type="text" class="form-control" id="amount" aria-describedby="amount" placeholder="Enter Spent Amount" onChange={(e)=>setAmt(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="reason">Source</label>
                    <input type="textarea" class="form-control" id="reason" placeholder="Source of money (in 150 words)" onChange={(e)=>setReason(e.target.value)}/>
                </div>
            </div>}
            </div>
            <div className="my-3 bg-white p-4">
                <label className="form-label fw-semibold">Upload your Proof</label>

                <div
                    className={`border border-primary rounded p-2 w-50 text-center ${isDragging
                        ? "bg-info bg-opacity-10 border-dark"
                        : "bg-light"
                        }`}
                    onClick={() => fileInputRef.current.click()}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    style={{ cursor: "pointer", transition: "0.2s" }}
                >
                    {(
                        <div className="text-muted">
                            <i
                                className="bi bi-cloud-upload"
                                style={{ fontSize: "70px" }}
                            ></i>
                            <br />
                            Drag & drop file here or click to select
                        </div>
                    )}
                </div>
                <div>
                    {fileName ? (
                        <div className="my-2">
                            <div className="fw-semibold px-1 text-dark border border-2">
                                File: {fileName} <br />
                                File Size: {formatFileSize(file.size)}
                            </div>

                            {/* IMAGE PREVIEW */}
                            {previewUrl && (
                                <img
                                    src={previewUrl}
                                    alt="preview"
                                    className="img-fluid rounded shadow-sm"
                                    style={{
                                        maxHeight: "180px",
                                        objectFit: "cover",
                                    }}
                                />
                            )}

                            {/* PDF PREVIEW */}
                            {!previewUrl && file?.type === "application/pdf" && (
                                <iframe
                                    src={URL.createObjectURL(file)}
                                    title="PDF Preview"
                                    className="w-100 mt-2 border rounded"
                                    style={{ height: "550px" }}
                                />
                            )}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                {error && (
                    <div className="alert alert-danger mt-2 py-2">
                        {error}
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    className="d-none"
                    accept="image/jpeg,image/png,application/pdf"
                    onChange={handleChange}
                />
            </div>
            <button className="btn btn-success" onClick={handleSave}>Save</button>
        </div>
    );
};

export default FileUpload;