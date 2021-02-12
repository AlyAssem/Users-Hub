import React from 'react';
import { Link } from 'react-router-dom';
import './HomeScreen.scss';

const HomeScreen = (props) => {
  return (
    <div className='home'>
      <h1 className='home__heading'>Our Community</h1>
      <hr />
      <ul className='flex home__flex home__flex--col'>
        {props.users.map((u) => (
          <div
            key={u.id}
            className='flex card user'
            style={{ padding: '20px' }}
          >
            <div className='user__text'>
              User: <span>{u.userName}</span>
            </div>
            <div className='user__text'>
              Name: <span>{u.name}</span>
            </div>
            <div className='user__text'>
              Surname: <span>{u.surname}</span>
            </div>
            <div className='user__text'>
              Department: <span>{u.department}</span>
            </div>
            <div className='user__text'>
              Status:{' '}
              {u.status === 'active' ? (
                <span style={{ color: 'white', backgroundColor: 'green' }}>
                  {u.status}
                </span>
              ) : (
                <span style={{ color: 'white', backgroundColor: 'red' }}>
                  {u.status}
                </span>
              )}
            </div>

            <Link
              to={`/edit/${u.id}`}
              style={{ alignSelf: 'flex-end' }}
              onClick={props.onEditClick}
            >
              <i className='fas fa-edit'></i>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default HomeScreen;
