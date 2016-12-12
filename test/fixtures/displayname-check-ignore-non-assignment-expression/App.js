import 'normalize.css'
import './global.scss'

import React from 'react'
import { Match, Miss } from 'react-router'
import { injectIntl } from 'react-intl'
import Helmet from 'react-helmet'
import WebFont from 'webfontloader'

import { default as t, storeIntlReference } from './util/lang'

import NotFound from './components/Pages/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'

import routes from './routes'

import styles from './app.scss'

WebFont.load({
    google: {
        families: ['Roboto:400,700']
    }
})

const App = ({intl}) => {

    storeIntlReference(intl)

    return (
        <div>

            <Helmet titleTemplate='%s - Datagro' title={t('home')} />

            <Header />

            <div className={styles.main}>

                {routes.map((route, i) =>
                    <Match key={i} pattern={route[0]} component={route[1]} exactly={!!route[2]} />
                )}

                <Miss component={NotFound} />

            </div>

            <Footer />

        </div>
    )
}

export default injectIntl(App)
