import { useEffect, useState } from 'react'
import Head from 'next/head'
import { fakedraft } from '../fakedraft'

export default function Home() {
  const [drafts, setDrafts] = useState([])
  const [token, setToken] = useState(fakedraft.token)
  const [accountId, setAccountId] = useState(fakedraft.accountId)

  const CUSTOM_EVENT_NAME = 'REVIEW4_SEND_DRAFTS'

  useEffect(() => {
    window.addEventListener(CUSTOM_EVENT_NAME, function(e) {
      setDrafts([
        ...e.detail
      ])
    })
  })

  const handleDispatchEvent = (e) => {
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENT_NAME, { detail: [fakedraft]}))
  }

  const handleResetDrafts = (e) => {
    setDrafts([])
  }

  const handleSaveDraft = (e) => {
    fakedraft.accountId = accountId
    fakedraft.token = token

    if(!!window.Android) {
      window.Android.saveDraft(JSON.stringify(fakedraft))
    }

    if(!!window.webkit) {
      window.webkit.messageHandlers.saveDraft.postMessage(fakedraft)
    }
  }

  const handleRemoveDraft = (e) => {
    fakedraft.accountId = accountId
    fakedraft.token = token

    if(!!window.Android) {
      window.Android.removeDraft(fakedraft.token)
    }

    if(!!window.webkit) {
      window.webkit.messageHandlers.removeDraft.postMessage(fakedraft.token)
    }
  }

  return (
    <div>
      <Head>
        <title>PoC Review V4</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='container p-8 bg-slate-100'>
        <div className="text-3xl font-bold pb-4 items-center">
          PoC Review V4
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-md shadow-md p-4 w-full bg-white">
            <div className="text-1xl font-bold">Save Draft</div>
            <div className='my-2 text-sm font-bold'>Android</div>
            <code className='text-sm break-words'>window.Android.saveDraft(entity)</code>
            <div className='my-2 text-sm font-bold'>iOS</div>
            <code className='text-sm break-words'>window.webkit.messageHandlers.saveDraft.postMessage(entity)</code>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className='my-2 text-sm font-bold'>Token</div>
                <input value={token} onChange={ e => setToken(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"/>
              </div>
              <div>
                <div className='my-2 text-sm font-bold'>Account Id</div>
                <input value={accountId} onChange={ e => setAccountId(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"/>
              </div>
            </div>
            <div>
              <button onClick={handleSaveDraft} className="rounded-md p-2 w-full mt-4 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
                Try Save Draft
              </button>
            </div>
          </div>

          <div className="rounded-md shadow-md p-4 w-full bg-white">
            <div className="text-1xl font-bold">Delete Draft</div>
            <div className='my-2 text-sm font-bold'>Android</div>
            <code className='text-sm break-words'>window.Android.deleteDraft(token)</code>
            <div className='my-2 text-sm font-bold'>iOS</div>
            <code className='text-sm break-words'>window.webkit.messageHandlers.deleteDraft.postMessage(token)</code>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className='my-2 text-sm font-bold'>Token</div>
                <input value={token} onChange={ e => setToken(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"/>
              </div>
              <div>
                <div className='my-2 text-sm font-bold'>Account Id</div>
                <input value={accountId} onChange={ e => setAccountId(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"/>
              </div>
            </div>
            <div>
              <button onClick={handleRemoveDraft} class="rounded-md p-2 w-full mt-4 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
                Try Remove Draft
              </button>
            </div>
          </div>

          <div className="rounded-md shadow-md p-4 w-full bg-white">
            <div className="text-1xl font-bold">Custom Event</div>
            <div className='text-sm break-workds mb-4'>Dispatch CustomEvent REVIEW4_SEND_DRAFTS</div>

            <code className='text-sm break-words'>
                window.dispatchEvent(new CustomEvent('REVIEW4_SEND_DRAFT', &#123; 'detail': [drafts] &#125;))
            </code>

            <div className='flex flex-row gap-2'>
              <button onClick={handleDispatchEvent} class="rounded-md p-2 w-full mt-4 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
                Dispatch
              </button>
              <button onClick={handleResetDrafts} class="rounded-md p-2 w-full mt-4 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
                Reset
              </button>
            </div>
            
            <div className='text-1xl font-bold my-4'>Draft Will Be Listed Below</div>
            <div>
              {drafts.length > 0 ? 
              <ol className='list-decimal px-4'>
                {drafts.map(item => (
                  <li key={item.token}>{item.token} -  Average Rating: {item.averageRating}</li>
                ))}
              </ol> : <div className='code'>No List From CustomEvent / No Custom Event Dispatched</div>
              }
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
