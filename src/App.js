import React, { useState } from 'react';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FiLink2, FiCopy, FiRepeat } from 'react-icons/fi';

function App() {
  const [link, setLink] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [displayGenerate, setDisplayGenerate] = useState(true)

  async function handleGenerateLink(e) {
    e.preventDefault()

    const formatedPhone = phone != null ? phone.slice(1) : ''
    let url

    if (!isPossiblePhoneNumber(phone)) { toggleError('add') }

    else if (formatedPhone !== '') {
      if (message === '' || message == null) {
        toggleError('remove')

        url = `https://api.whatsapp.com/send?phone=${formatedPhone}`
        setLink(url)
        setDisplayGenerate(false)
      }
      else {
        toggleError('remove')

        const formatedMessage = message.split(' ').join('%20')
        url = `https://api.whatsapp.com/send?phone=${formatedPhone}&text=${formatedMessage}`
        setLink(url)
        setDisplayGenerate(false)
      }
    }
  }

  function toggleError(method) {
    const phoneInputContainer = document.getElementById('phone-input-container')
    const haveClassError = phoneInputContainer.classList.contains('error')

    if (method === 'add' && !haveClassError) {
      phoneInputContainer.classList.add('error')
    }
    if (method === 'remove' && haveClassError) {
      phoneInputContainer.classList.remove('error')
    }
  }

  function copyLink(e, id) {
    const paragraph = document.getElementById(id)
    paragraph.select()

    try {
      document.execCommand('copy');
      alert('Texto copiado!');
    } catch (err) {
      alert('O evento de copiar não está disponível no seu navegador.');
    }
  }

  function newLink(e) {
    setLink('')
    setDisplayGenerate(true)
  }

  return (
    <main>

      <section className="generate-link">
      <form
        onSubmit={(e) => handleGenerateLink(e)}
        className="generate-link-form form-container"
        style={{ display: displayGenerate ? "block" : "none" }}
      >
        <div className="input-container" id="phone-input-container">
          <label htmlFor="phone-number">Número de WhatsApp da sua Empresa</label>
          <PhoneInput
            name="phone-number"
            defaultCountry="BR"
            placeholder="00 000000000"
            onChange={setPhone}
            className="input"
          />
        </div>

        <div className="input-container">
          <label htmlFor="message">Mensagem pré definida</label>
          <textarea
            name="message"
            placeholder="Escreva sua mensagem"
            value={message}
            className="input"
            onChange={(e) => setMessage(e.target.value)}></textarea>
        </div>

        <button type="submit" className="btn">
          <span className="icon-button">
            <FiLink2 size={24} />
          </span>
          Gerar link de WhatsApp
        </button>
      </form>

        
      <section className="initial">
        <div className="page-name">
          <h1>Atenda mais clientes e aumente suas vendas!</h1>


          <h2>Acesse o material gratuito com Guia de Vantagens da API oficial do WhatsApp Business.</h2>
          <img className= "redes-sociais" src="./logo-redes.png"></img>
          <button type="submit" className="btn-material">
            <span className="icon-button-material">
            </span>
            Acessar Material
          </button>

        </div>
      </section>

      <article
        className="copy-link-form form-container"
        style={{ display: !displayGenerate ? "block" : "none" }}
      >
        <div className="input-container">
          <label htmlFor="link-long">Link</label>
          <div className="display-link">
            <input id="link-long" value={link} placeholder={link} readOnly className="input-display" />
            <button
              onClick={(e) => copyLink(e, 'link-long')}
              className="btn-copy"
            >
              <FiCopy size={24} />
            </button>
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="link-short">Link encurtado</label>
          <div className="display-link">
            <p id="link-short"></p>
            <button
              onClick={(e) => copyLink(e, 'link-short')}
              className="btn-copy"
            >
              <FiCopy size={24} />
            </button>
          </div>
        </div>

        <button
          className="btn"
          onClick={(e) => newLink(e)}
        >
          <span className="icon-button">
            <FiRepeat size={24} />
          </span>
          Novo link
        </button>
      </article>

    </section>
    </main >
  );
}

export default App;
