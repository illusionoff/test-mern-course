import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');

  // для избавления бага при выходе перекрытие надписей Email и Введите email и аналогично для пароля
  useEffect(() => {
    window.M.updateTextFields();
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        });
        history.push(`/detail/${data.link._id}`);
      } catch (e) { }
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}></div> {/* col.s8.offset-s2 */}
        <div className="input-field">
          <input
            placeholder="Вставте ссылку"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div >
  )
}
