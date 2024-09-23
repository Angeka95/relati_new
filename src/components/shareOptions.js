

import { AppBar, Tabs, Tab, Box, Container } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import IconFacebook from '../assets/images/icons/facebook.png';
import IconTwitter from '../assets/images/icons/twitter.png';
import IconMail from '../assets/images/icons/gmail.png';
import IconEnglish from '../assets/images/icons/english.png';




export default function ShareOptions() {


    return (
        <div>
            <Box className="width_100 list_boletines" >


                                <div >
                                    <Container className='width_100 padding_none'>
                                        
                                        
                                         
                                           
                                            <div className="share_options_container bg_green margin_bottom_m margin_top_s text_white wrap"> 
                                                <div className="icons_group2 vertical_align wrap">
                                                    <div className="justify_center align_center width_100"> 
                                                        <img src={IconEnglish} className=" icon_round vertical_align"> 
                                                                
                                                        </img>
                                                    </div>
                                                    <div className="width_100 text_center icon_space">English </div> 

                                                </div>
                                                <div className="" > 
                                                     <div className="icon_border"> </div>
                                                </div>
                                                <div className="icons_group1 vertical_align wrap">
                                                    <div className="justify_between icons_group_position width_100"> 
                                                        <img src={IconFacebook} className="icon_round icon_bigger"> 
                                                        
                                                        </img>
                                                        <img src={IconTwitter} className="icon_round icon_bigger"> 
                                                        
                                                        </img>
                                                        <img src={IconMail } className="icon_round icon_bigger"> 
                                                        
                                                        </img>

                                                    </div>
                                                    <div className="width_100 text_center icon_space2">Compartir </div> 
                                                </div>
                                            </div> 
                                            
                                               
                                        
                                       
                                    </Container>
                                </div>
                           

                    </Box>

        
        </div>
    );

}