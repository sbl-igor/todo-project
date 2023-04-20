import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import s from './App.module.scss';



function App() {

  // Modal'ka
  const [modalActive, setModalActive] = useState(false); // bool для создания заметки
  const [modalActiveEdit, setModalActiveEdit] = useState(false);

  const [textTextArea, setTextTextArea] = useState(''); // state для textarea
  // @ts-ignore
  // const storage = localStorage.getItem('dataOnPage');
  // @ts-ignore
  const [dataOnPage, setDataOnPage] = useState(JSON.parse(sessionStorage.getItem('dataOnPage')) || []); // массив из наших заметок, видны на странице
  // const [dataForLocalStr, setDataForLocalStr] = useState([])
  // - - -
  const [editNum, setEditNum] = useState(0); // стейт, хранящий номер элемента массива  
  // - - -
  const [tags, setTags] = useState([]);
  // localStorage.clear()
  // const [dataForTags, setDataForTags] = useState([])
  // console.log('dataOnPage', dataOnPage)
  
  // function for removing card on page
  const removeDiv = (key: number) => {
    setDataOnPage([...dataOnPage.slice(0, key), ...dataOnPage.slice(key + 1)]);
  }
  
  // function for change value from textarea to element of array
  const changeItem: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if(editNum !== null) {
      setDataOnPage([...dataOnPage.slice(0, editNum), event.target.value, ...dataOnPage.slice(editNum + 1)]);
    }
  }
  // Поиск ХешТега по регулярке
  const findTags = (val: any) => {
    setTags(val.match(/#[0-9A-Za-zА-Яа-яё]+/gm));
  }
  
  useEffect(() => {
    // @ts-ignore
    setDataOnPage(JSON.parse(sessionStorage.getItem('dataOnPage') || []));
  }, []);
  useEffect(() => {
    sessionStorage.setItem('dataOnPage', JSON.stringify(dataOnPage || []));
  }, [textTextArea, dataOnPage]);

  // split(' ').map(el => {
  //   if (tags !== null) {
  //     tags.map(tag => {
  //       return el === tag ? el = `<i>${el}</i>` : el
  //     })
  //   } 
  //   return el
  // }).join(' ')}

  return (    
    <main>      
    <Header/>
      <button className={s.addNoteBtn} 
      onClick={() => {
        setModalActive(true)
      }}>Add note</button>

      <Modal active={modalActive} setActive={setModalActive}>
        <>
        <h1 className={s.h3Modal}>Create note</h1>
        <textarea id={s.textarea} maxLength={260} 
        onChange={(e) => setTextTextArea(e.target.value)}
        value={textTextArea}
        >
        </textarea>
        <section className={s.buttons}>
        <button onClick={() => {
            setModalActive(false) // Hide modal
            setTextTextArea('')
        }
        }>Exit</button>
        <button onClick={() => {
            setModalActive(false) // Hide modal
            setTextTextArea('')
            // - - -
            dataOnPage.push(textTextArea);
        }
        }>Add note</button>
        </section>
        </>
      </Modal>

    <div className={s.cardsField}>
      {dataOnPage === null ? [] : dataOnPage.map((el: string, i: number) => (
         <div key={i} className={s.card}>
          <p id={s.textForCard}>{el}</p>
          <section className={s.buttons}>
          <button 
          onClick={() => {
            setModalActiveEdit(true);
            setEditNum(i)
            findTags(el)
          }}>
            Edit
          </button>
          
        <Modal active={modalActiveEdit} setActive={setModalActiveEdit}>
          <>
          <h1 className={s.h3Modal}>Edit Note</h1>
          <textarea id={s.textarea} maxLength={260} 
          onChange={(event) => {
            changeItem(event);
            findTags(event.target.value);
          }}
          value={dataOnPage[editNum]}
          >            
          </textarea>

          <div className={s.tags}>
            {tags !== null ? tags.map((tag: string, i) => (<span key={i} className={s.boxTag}>{tag.slice(1)}</span>)) : ''}
          </div>
          <section className={s.buttons}>
          <button onClick={() => {
              setModalActiveEdit(false) // Hide modal
              setTextTextArea('')
          }
          }>Exit</button>
          <button onClick={() => {
              setModalActiveEdit(false) // Hide modal
              // - - -
          }
          }>Edit note</button>
          </section>
          </>
        </Modal>
        
        <button onClick={() => {
            removeDiv(i)
        }}>Delete card
        </button>
        </section>
        </div>
      ))}
    </div>

      <Footer/>
    </main>
  );
}

export default App;
