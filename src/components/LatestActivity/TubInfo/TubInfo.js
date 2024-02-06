import React from 'react';

import WhiteButtonWithoutIcon from '../../buttons/WhiteButtonWithoutIcon/WhiteButtonWithoutIcon';
import styles from './TubInfo.module.scss'

const TubInfo = ({ text }) => {

    return (

        <div className={styles.TubInfo_block}>
            <p className={styles.TubInfo_text}>
                {
                    text
                }
            </p>
            <WhiteButtonWithoutIcon text={'Відвідати Головну'}/>
        </div>
    );
};

export default TubInfo;