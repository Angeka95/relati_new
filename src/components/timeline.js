import { Container, Button, Tooltip, Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { styled } from "@mui/material/styles";

export default function Timeline({ data, autosApertura }) {
  const [showMore, setShowMore] = useState(false);

  const autosLista = data.filter(event =>
    !event.hecho.toLowerCase().includes("auto de apertura")
  );
  // Limite hitos visibles
  const visibleEvents = showMore ? autosLista : autosLista.slice(0, 3);


  const nombreSubcaso = visibleEvents[0]?.nombre ?? "";
  const numeroCaso = visibleEvents[0]?.numero ?? "";

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  
  const GridApertura = styled(Grid)(({ theme }) => ({
  
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: "#f9f9f9",
      },
    }));

    const GridAutos = styled(Grid)(({ theme }) => ({
  
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      },
    }));


  return ( 
<Box className="foot_subcasos" > 

  <Container> 
            <div  style={{paddingLeft: "18.5%", paddingBottom: "20px", paddingTop: "20px"}}> 
            <p className="versalitas label_subcaso"> evolución {nombreSubcaso === numeroCaso ? "caso" : "subcaso" }</p> 
              <div className="title_subcaso"> 
              <h4 className="text_left text_black  margin_top_s "> <span className="  text_bolder separator_subcaso">  {nombreSubcaso} </span> </h4>
              </div> 
          <div className="width_100 justify_center">
  
          </div>
  
            </div>
          {/* <div className="info_timeline_container">
                  <div className="info_timeline "> 
                  <InfoIcon className="timeline-icon" />
                    <p class="text_bolder">En esta línea del tiempo identifique decisiones:</p>
                    <div class="text_blue">Tramitadas ante Sala 
                   <span class="text_green display_block">Tramitadas ante Tribunal </span></div> 
                  </div> 
          </div> */}
          </Container> 
    <Container className="margin_top_l " style={{ display: "flex" }}>
      {/* Columna  autos de apertura */}
      <GridApertura>
      <div className="timeline_apertura">
        <div className="timeline_dot_initial" />
        {autosApertura.map((event, index) => (
          
          <div className="timeline_item dot_salient" key={index}>
            <h6 className="timeline_month">{event.mes}</h6>
           
            <h6 className="timeline_date text_bolder">{event.anio}</h6>
            <div className={`${event.tramite === "Sala"
                      ? "timeline_line_green "
                      : "timeline_line"
                      } link_nounderline`} />
            <div className= {`${event.tramite === "Sala"
                      ? "timeline_dot_green"
                      : "timeline_dot"
                      } link_nounderline`} />
            <div className="timeline_content timeline_salient">
              {event.enlace.length > 0 ? (
                <div>
                  <a
                    href={event.enlace}
                    target="_blank"
                    rel="noreferrer"
                    className={`${event.tramite === "Sala"
                      ? "link_primary "
                      : "link_secondary"
                      } link_nounderline`}
                  >
                    <Tooltip title={event.hecho}>
                      <h6 className="limit_lines ">{event.hecho}</h6>
                     
                    </Tooltip>
                    <p className="margin_bottom_l ">{event.actor}</p>
                  
                  </a>
                  <p className="text_secondary timeline_tramite versalitas">
                    <span
                      className={`${event.tramite === "Sala"
                        ? "text_green"
                        : "text_blue"
                        } timline_dot_bullet`}
                    >●
                  
                    </span>{" "}
                    {`Tramite ante ${event.tramite}`.toLowerCase()}
                    <span
                      className={`${event.tramite === "Sala"
                        ? "text_green"
                        : "text_blue"
                        } timline_dot_r_bullet`}
                    >●
                  
                    </span>
                  </p>
                </div>
              ) : (
                <>
                  <Tooltip title={event.hecho}>
                    <h6 className="limit_lines ">{event.hecho}</h6>
                  </Tooltip>
                  <p className="margin_bottom_l">{event.actor}</p>
              
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      </GridApertura>
      <GridAutos>
      {/* Columna de otros autos */}
      <div className="width_100" style={{ display: "flex", justifyContent: "end" }}>
        <div className="timeline " style={{ maxWidth: "98%" }}>
          {visibleEvents.map((event, index) => (
            <div className="timeline_item" key={index}>
              <h6 className="timeline_month">{event.mes}</h6>
              <h6 className="timeline_date text_bolder">{event.anio}</h6>
              <div className="timeline_line" />
              <div className="timeline_dot" />
              <div className="timeline_content">
                {event.enlace.length > 0 ? (
                  <div>
                    <a
                      href={event.enlace}
                      target="_blank"
                      rel="noreferrer"
                      className={`${event.tramite === "Sala"
                        ? "link_primary"
                        : "link_secondary"
                        } link_nounderline`}
                    >
                      <Tooltip title={event.hecho}>
                        <h6 className="limit_lines">{event.hecho}</h6>
                      </Tooltip>
                      <p className="margin_bottom_l">{event.actor}</p>
               
                    </a>
                    <p className="text_secondary timeline_tramite versalitas">
                      <span
                        className={`${event.tramite === "Sala"
                          ? "text_green"
                          : "text_blue"
                          } timline_dot_bullet`}
                      >
                        ●
                      </span>{" "}
                      {`Tramite ante ${event.tramite}`.toLowerCase()}
                      <span
                        className={`${event.tramite === "Sala"
                          ? "text_green"
                          : "text_blue"
                          } timline_dot_r_bullet`}
                      >
                        ●
                      </span>
                    </p>
                  </div>
                ) : (
                  <>
                    <Tooltip title={event.hecho}>
                      <h6 className="limit_lines">{event.hecho}</h6>
                    </Tooltip>
                    <p className="margin_bottom_l">{event.actor}</p>
                   
                  </>
                )}
              </div>
            </div>
          ))}

        



        </div>
      </div>
     \</GridAutos>
    </Container>
    <Container> 
    <div className="display_flex width_100"> 
    {showMore}
    <div   className="timeline_aside timeline_apertura">
      
    </div>
    <div className="container_button_subcaso">

    
          <div className="justify_center text_center  button_subcaso ">
            {data.length > 4 && (
              <Button
                onClick={handleToggle}
                className="button_secondary shadow_smooth  margin_bottom_m "
              >
                {showMore ? "Ver menos del subcaso" : "Ver más del subcaso"}
              </Button>
            )}
          </div>

        </div>
      </div>
    </Container> 
    </Box>
    
  );
}