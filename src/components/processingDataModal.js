import '../App.css';
import { Modal, Box, CircularProgress } from '@mui/material';

import React, { useState } from 'react';


export default function ProcessingDataModal({openModal, handleOpenModal, handleCloseModal }) {
 
  return (
    <>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <h3 className="text_center" id="modal-title">
                        Se está procesando la información
                    </h3>
                    <h6 className="text_center title_description margin_top_s margin_bottom_m" id="modal-description">
                        Espere un momento por favor
                    </h6>
                    <CircularProgress sx={{ mb: 2 }}/>
                </Box>
            </Modal>
    </>
  );
}