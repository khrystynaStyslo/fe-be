import React from 'react'
import {Link} from "react-router-dom";

export const LinksList = ({ links }) => {
    if (!links.length) {
        return <p className="center">You don't have links</p>
    }
    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Original link</th>
                <th>Short link</th>
                <th>Open</th>
            </tr>
            </thead>

            <tbody>
            {links.map((link, index) => (
                <tr>
                    <td>{index + 1}</td>
                    <td>{link.from}</td>
                    <td>{link.to}</td>
                    <td>
                        <Link to={`/detail/${link._id}`}>Open link</Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}