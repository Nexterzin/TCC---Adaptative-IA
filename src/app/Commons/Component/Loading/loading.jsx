'use client'

import './loading.css'

import { Stack } from '@mui/material'

const Loading = () => {
    return (
        <Stack justifyContent="center" alignItems="center">
            <div className="content">
                <div className="pill">
                    <div className="medicine">
                        {[...Array(15)].map((_, i) => (
                            <i key={i}></i>
                        ))}
                    </div>
                    <div className="side"></div>
                    <div className="side"></div>
                </div>
            </div>
        </Stack>
    )
}

export default Loading
