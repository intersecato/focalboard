// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import Button from '../widgets/buttons/button'
import client from '../octoClient'
import './changePasswordPage.scss'
import {IUser} from '../user'
import {useAppSelector} from '../store/hooks'
import {getMe} from '../store/users'

const ChangePasswordPage = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [succeeded, setSucceeded] = useState(false)
    const user = useAppSelector<IUser|null>(getMe)

    if (!user) {
        return (
            <div className='ChangePasswordPage'>
                <div className='title'>{'Modifica Password'}</div>
                <Link to='/login'>{'Log in first'}</Link>
            </div>
        )
    }

    const handleSubmit = async (userId: string): Promise<void> => {
        const response = await client.changePassword(userId, oldPassword, newPassword)
        if (response.code === 200) {
            setOldPassword('')
            setNewPassword('')
            setErrorMessage('')
            setSucceeded(true)
        } else {
            setErrorMessage(`Change password failed: ${response.json?.error}`)
        }
    }

    return (
        <div className='ChangePasswordPage'>
            <div className='title'>{'Modifica Password'}</div>
            <form
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault()
                    handleSubmit(user.id)
                }}
            >
                <div className='oldPassword'>
                    <input
                        id='login-oldpassword'
                        type='password'
                        placeholder={'Inserisci password attuale'}
                        value={oldPassword}
                        onChange={(e) => {
                            setOldPassword(e.target.value)
                            setErrorMessage('')
                        }}
                    />
                </div>
                <div className='newPassword'>
                    <input
                        id='login-newpassword'
                        type='password'
                        placeholder={'Inserisci nuova password'}
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value)
                            setErrorMessage('')
                        }}
                    />
                </div>
                <Button
                    filled={true}
                    submit={true}
                >
                    {'Modifica Password'}
                </Button>
            </form>
            {errorMessage &&
                <div className='error'>
                    {errorMessage}
                </div>
            }
            {succeeded &&
                <Link
                    className='succeeded'
                    to='/'
                >{'Password modificata! Clicca per conitnuare'}</Link>
            }
            {!succeeded &&
                <Link to='/'>{'Annulla'}</Link>
            }
        </div>
    )
}

export default React.memo(ChangePasswordPage)
