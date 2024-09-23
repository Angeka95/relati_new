

import { AppBar, Tabs, Tab, Box, Container } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import IconFacebook from '../assets/images/icons/facebook.png';
import IconTwitter from '../assets/images/icons/twitter.png';
import IconMail from '../assets/images/icons/gmail.png';
import IconEnglish from '../assets/images/icons/english.png';
import ShareOptions from '../components/shareOptions.js';



export default function CustomTab() {
    const [value, setValue] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div>
            <Box className="width_100 list_boletines" >

                <Container>

                    <AppBar position="static" className="noshadow ">
                        <Tabs value={value} onChange={handleChangeTab} className='light_white ' classes={{ indicator: 'custom_indicator' }}>
                            <Tab label="2024" className={`tab ${value === 0 ? 'tab_active' : ''}`} />
                            <Tab label="2023" className={`tab ${value === 1 ? 'tab_active' : ''}`} />
                            <Tab label="2022" className={`tab ${value === 2 ? 'tab_active' : ''}`} />
                        </Tabs>
                        <div className="separator_tab"> </div>
                    </AppBar>
                    <Box p={3}>
                        {/* Tab 1  */}
                        {value === 0 &&

                                <div >
                                    <Container className='width_100'>
                                        <div className="wrap justify_center item_boletin_container">
                                            <h2 className="width_100 text_center margin_m text_bolder">Boletines 2024</h2>
                                            <div className=""> 
                                                <img className=" item_boletin" src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8">
                                                </img>
                                                <ShareOptions> </ShareOptions>
                                            </div> 

                                            <div className="">
                                                <img className="item_boletin" src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8">
                                                </img>
                                                <ShareOptions> </ShareOptions>
                                            </div>


                                            <div className="">
                                                <img className="item_boletin" src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8">
                                                </img>
                                                <ShareOptions> </ShareOptions>
                                            </div>
                                            <div className="">
                                                <img className="item_boletin" src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8">
                                                </img>
                                                <ShareOptions> </ShareOptions>
                                            </div>
                                            

                                        </div>
                                    </Container>
                                </div>
                           
                        }


                        {/* Tab 2  */}
                        {value === 1 && 
                                <div >
                                <Container className='width_100'>
                                    <div className="wrap justify_center item_boletin_container">
                                    <h2 className="width_100 text_center margin_m text_bolder">Boletines 2023</h2>
                                        <img className="item_boletin" src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8">
                                        </img>
                                        
                                        <img className="item_boletin" src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8">
                                        </img>
                                        <img className="item_boletin" src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8">
                                        </img>
                                        <img className="item_boletin" src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8">
                                        </img>
                                    </div>
                                </Container>
                            </div>
                            }
                         {/* Tab 3  */}
                        {value === 2 && 
                                <div >
                                <Container className='width_100'>
                                    <div className="wrap justify_center item_boletin_container">
                                    <h2 className="width_100 text_center margin_m text_bolder">Boletines 2022</h2>
                                            <img className="item_boletin" src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8">
                                            </img>
                                            <img className="item_boletin" src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8">
                                            </img>
                                            <img className="item_boletin" src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8">
                                            </img>
                                            <img className="item_boletin" src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8">
                                            </img>
                                    </div>
                                </Container>
                            </div>
                            }
                    </Box>

                </Container>
            </Box>
        </div>
    );

}