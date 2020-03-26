import React from 'react'

const UserList = ({users}) => {
    return (
        <ul className='userlist'>
            {users.map(user => (
                <li key={user.id}>
                    <div style={{
                        background: `url(${user.avatar ? user.avatar : 'https://api.adorable.io/avatars/285/abott@adorable.png'}) center center no-repeat`,
                        backgroundSize: 'cover',
                        width: '50px',
                        height: '50px',
                    }} className='userlist--image'></div>
                    <div className='userlist--info'>
                        <p>{user.first_name} {user.last_name}</p>
                        <p>{user.email}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default UserList;