import * as React from 'react';
import Dropzone from 'react-dropzone'
import { useEffect, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from "../icons/UploadIcon"
import FileIcon from "../icons/FileIcon"
import { Button, Grid, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DescriptionForm from './DescriptionForm';
import { attachFiles } from '../utils/api';

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const UploadForm = () => {

    const [files, setFiles] = useState({})
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleCancel = () => {
        setFiles([])
    }

    const handleCheck = (fileKey, value) => {
        const { [fileKey]: removedFile, ...prevFiles } = files
        if (value === true) removedFile.checked = false
        else removedFile.checked = true
        prevFiles[fileKey] = removedFile
        setFiles(prevFiles)
    }

    const handleAttach = () => {
        let selectedFiles = []
        Object.keys(files).map((fileKey) => {

            if (files[fileKey].checked===true) {
                selectedFiles.push(files[fileKey].file)
            }
        })
        attachFiles(selectedFiles)
        setOpen(true)
    }


    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length > 0) {
            acceptedFiles.map((file, index) => {
                const fileKey = `${Object.keys(files).length + index}`;
                setFiles((prevFiles) => ({
                    ...prevFiles, [fileKey]: {file: file, checked: false}
                })
                )
            })
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


    return (
        <>
            <div className="upload-form">
                <div className="dropzone-box">
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <>
                                    <UploadIcon fontSize="2.5rem" />
                                    <Typography> <span style={{ color: "#5E5ADB" }}>Drop files here</span></Typography>
                                </>
                                :
                                <>
                                    <UploadIcon fontSize="2.5rem" />
                                    <Typography> <span style={{ color: "#5E5ADB" }}>Click to upload PDF</span> or drag and drop</Typography>

                                </>
                        }
                    </div>
                </div>
                <div className="files-list-box">
                    {Object.keys(files)?.length > 0 && Object.keys(files).map((fileKey) => {
                        return (
                            <div className="files-list-item" key={fileKey}>
                                <div className='file-icon'>
                                    <FileIcon fontSize={45} />
                                </div>
                                <div className='file-data'>
                                    <Typography sx={{ color: '#344054' }}>{files[fileKey].file.path}</Typography>
                                    <Typography sx={{ color: '#475467' }}>{formatBytes(files[fileKey].file.size)} – 100% uploaded</Typography>
                                </div>
                                <div className='file-checkbox'>
                                    <Checkbox color="secondary" value={files[fileKey].checked} onChange={(e) => handleCheck(fileKey, e.target.value)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="files-btn-box">
                    <Button variant="outlined" color="tertiary" sx={{ mr: 1, textTransform: 'none', }} onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" color="secondary" sx={{ textTransform: 'none', }} onClick={handleAttach}>Attach Files</Button>
                </div>
            </div>
            <DescriptionForm open={open} handleClose={handleClose} />
        </>
    );
}

export default UploadForm;