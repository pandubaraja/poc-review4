import { useEffect, useState } from 'react'
import Head from 'next/head'
import { fakedraft } from '../fakedraft'

export default function Home() {
  const [drafts, setDrafts] = useState([])

  useEffect(() => {
    window.addEventListener('REVIEW4_SEND_DRAFTS', function(e) {
      setDrafts([
        ...e.detail
      ])
    })
  })

  const handleSaveDraft = (e) => {
    if(!!window.Android) {
      window.Android.saveDraft(fakedraft)
    }

    if(!!window.webkit) {
      window.webkit.messageHandlers.saveDraft.postMessage(fakedraft)
    }
  }

  const handleDeleteDraft = (e) => {
    if(!!window.Android) {
      window.Android.deleteDraft(fakedraft.token)
    }

    if(!!window.webkit) {
      window.webkit.messageHandlers.deleteDraft.postMessage(fakedraft.token)
    }
  }

  return (
    <div className="container">
      <Head>
        <title>PoC Review V4</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          PoC Review V4 JSI &amp; Custom Event
        </h1>

        <div className="grid">
          <a className="card" onClick={handleSaveDraft}>
            <h3>Save Draft (Click Card To Trigger)</h3>
            <div><strong>Android</strong></div>
            <div className='code'>window.Android.saveDraft(entity)</div>
            <div><strong>iOS</strong></div>
            <div className='code'>window.webkit.messageHandlers.saveDraft.postMessage(entity)</div>
          </a>

          <a className="card" onClick={handleDeleteDraft}>
            <h3>Delete Draft (Click Card To Trigger)</h3>
            <div><strong>Android</strong></div>
            <div className='code'>window.Android.deleteDraft(token)</div>
            <div><strong>iOS</strong></div>
            <div className='code'>window.webkit.messageHandlers.deleteDraft.postMessage(token)</div>
          </a>
          <a className="card">
            <h3>Custom Event</h3>
            <div>Try dispatch CustomEvent <strong>REVIEW4_SEND_DRAFTS</strong> from Native Apps or Browser Console</div>

            <div className='code'>
                window.dispatchEvent(new CustomEvent('REVIEW4_SEND_DRAFT', &#123; 'detail': [drafts] &#125;))
            </div>
            
            <br></br>
            <div><strong>Draft Will Be Listed Below</strong></div>
            <div>
              {drafts.length > 0 ? 
              <ol>
                {drafts.map(item => (
                  <li key={item.token}>{item.token} -  Average Rating: {item.averageRatingValue}</li>
                ))}
              </ol> : <div className='code'>No List From CustomEvent / No Custom Event Dispatched</div>
              }
            </div>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
