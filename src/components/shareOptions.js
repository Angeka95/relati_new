

import { AppBar, Tabs, Tab, Box, Container } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import IconFacebook from '../assets/images/icons/facebook.png';
import IconTwitter from '../assets/images/icons/twitter.png';
import IconMail from '../assets/images/icons/gmail.png';
import IconEnglish from '../assets/images/icons/english.png';
import { Button, TextField } from '@mui/material';
import ShareOutlined from '@mui/icons-material/ShareOutlined';



export default function ShareOptions({ boletines, currentBoletinId }) {

    // email input

    const [email, setEmail] = useState('');
    const [showEmailInput, setShowEmailInput] = useState(false);

    // Boletin actual usando id
    const currentBoletin = boletines.find(boletin => boletin.id === currentBoletinId);

    if (!currentBoletin) {
        return <p> </p>;
    }


    return (
        <div>
            <Box className="width_100 list_boletines margin_bottom_m"  >


                <div >
                    <Container className='width_100 padding_none justify_center'>




                        <div className="share_options_container bg_green margin_bottom_m margin_top_s text_white wrap justify_center">

                            {currentBoletin.versionIngles.length > 1 && (

                                <div className="icons_group2 vertical_align wrap">
                                    <div className="justify_center align_center ">
                                        <a href={currentBoletin.versionIngles} target='_blank' >
                                            <img src={IconEnglish} className=" icon_bigger icon_round icon_english vertical_align">

                                            </img>
                                        </a>

                                    </div>
                                    <div className="width_100 text_center ">English </div>


                                </div>

                            )}

                            {currentBoletin.versionIngles && (
                                <div className="icon_border">
                                </div>
                            )}


                            <div className="icons_group1 vertical_align wrap">
                                <div className="justify_around icons_group_position width_100">
                                    {currentBoletin.twitter && (
                                        <a href={currentBoletin.twitter} target='_blank' >
                                            <img src={IconTwitter} className="icon_round icon_bigger">

                                            </img>
                                        </a>
                                    )}

                                    {currentBoletin.facebook && (
                                        <a href={currentBoletin.facebook} target='_blank'  >
                                            <img src={IconFacebook} className="icon_round icon_bigger">

                                            </img>
                                        </a>
                                    )}

                                    {currentBoletin.mail && (

                                        <img onClick={() => setShowEmailInput(!showEmailInput)} src={IconMail} className="icon_round icon_bigger">

                                        </img>




                                    )}

                                    {showEmailInput && (
                                        <div className="input_float">
                                            <TextField
                                                label="Ingrese un correo"
                                                className="input_float_style"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                margin="normal"
                                            />

                                            <Button className=" button_primary button_icon"><ShareOutlined /></Button>



                                        </div>
                                    )}


                                </div>
                                {(currentBoletin.facebook || currentBoletin.mail || currentBoletin.twitter) && (
                                    <div className="width_100 text_center icon_space2">Compartir </div>
                                )}
                            </div>






                        </div>




                    </Container>
                </div>


            </Box>


        </div>
    );

}