import React, { useState } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import CountUp from 'react-countup'
import numeral from 'numeral'
import cx from 'classnames'

import styles from './Cards.module.css'

const Cards = ({ data, handleGetType }) => {
    
    const [active, setActive] = useState('cases');

    const { cases, recovered, deaths, todayCases, todayRecovered, todayDeaths } = data;
    if(!cases) return "Loading...";



    return (
        <div className={styles.container} >
            <Card 
                variant="outlined" 
                className={active === 'cases' ? cx(styles.card, styles.active_cases, styles.card_cases) 
                : cx(styles.card, styles.card_cases)} 
                onClick={e => {handleGetType("cases"); setActive('cases')}}
            >
                <CardContent>
                    <Typography color="textSecondary">Cases</Typography>
                    <Typography color="textPrimary">
                        <strong>
                        +
                        <CountUp 
                                start={0}
                                end={todayCases}
                                duration={3}
                                separator=","
                        />
                        </strong>
                    </Typography>
                    <Typography color="textSecondary">
                    <CountUp
                            start={0}
                            end={cases}
                            duration={3}
                            separator=","
                        /> total
                    </Typography>
                </CardContent>
            </Card>  
            <Card 
                variant="outlined" 
                className={active === 'recovered' ? cx(styles.card, styles.active_recovered, styles.card_recovered) 
                : cx(styles.card, styles.card_recovered)}
                onClick={e => {handleGetType("recovered"); setActive('recovered')}}
            >
                <CardContent>
                    <Typography color="textSecondary">Recovered</Typography>
                    <Typography color="textPrimary">
                        <strong>
                        +
                        <CountUp
                            start={0}
                            end={todayRecovered}
                            duration={3}
                            separator=","
                        />
                        </strong>
                    </Typography>
                    <Typography color="textSecondary"> 
                        <CountUp
                            start={0}
                            end={recovered}
                            duration={3}
                            separator=","
                        /> total
                    </Typography>
                </CardContent>
            </Card>
            <Card 
                variant="outlined" 
                className={active === 'deaths' ? cx(styles.card, styles.active_deaths, styles.card_deaths) 
                : cx(styles.card, styles.card_deaths)}
                onClick={e => {handleGetType("deaths"); setActive('deaths')}}
            >
                <CardContent>
                    <Typography color="textSecondary">Deaths</Typography>
                    <Typography color="textPrimary">
                        <strong>
                        +
                        <CountUp 
                            start={0}
                            end={todayDeaths}
                            duration={3}
                            separator=","
                        />
                        </strong>
                    </Typography>
                    <Typography color="textSecondary">
                        <CountUp
                            start={0}
                            end={deaths}
                            duration={3}
                            separator=","
                        /> total
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Cards
