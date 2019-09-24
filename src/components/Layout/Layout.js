import React  from 'react';

import classes from  './Layout.css'
import  Auxi from '../../hoc/Auxi'

const layout = ( props ) => (
    <Auxi>
    <div>Toolbar,  SideDrawer, Backdrop</div>
    <main className={classes.Content}>
        {props.children}
    </main>
    </Auxi>
);

export default layout;