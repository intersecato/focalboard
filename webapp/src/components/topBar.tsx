// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react'

import './topBar.scss'
import {FormattedMessage} from 'react-intl'

import HelpIcon from '../widgets/icons/help'
import {Utils} from '../utils'
import {Constants} from '../constants'

const TopBar = (): JSX.Element => {
    if (Utils.isFocalboardPlugin()) {
        const feedbackUrl = 'https://www.focalboard.com/fwlink/feedback-boards.html?v=' + Constants.versionString
        return (
            <div
                className='TopBar'
            >

                <div className='versionFrame'>
                    <div
                        className='version'
                        title={`v${Constants.versionString}`}
                    >
                        {`v${Constants.versionString}`}
                    </div>
                </div>
            </div>
        )
    }

    const focalboardFeedbackUrl = 'https://www.focalboard.com/fwlink/feedback-focalboard.html?v=' + Constants.versionString
    return (
        <div
            className='TopBar'
        >

        </div>
    )
}

export default React.memo(TopBar)
