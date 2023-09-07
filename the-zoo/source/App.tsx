import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Ianimal } from './models/Ianimal';
import { getAnimals } from './services/animalService';
import { Animals } from './components/animals';
import Animal from './components/animal';


function App() {
  const [animals, setAnimals] = useState<Ianimal[]>([]);

  useEffect(() => {
    const getData = async () => {
    const fetchedAnimals = await getAnimals();
      setAnimals(fetchedAnimals);
      localStorage.setItem('animals', JSON.stringify(fetchedAnimals));
  };
  getData();
}, []);

  return (
    <>
      <Routes>
        <Route path="/" element={ <ul className='animals-list'> <Animals animals={animals}/></ul>}/>
        <Route path="/animal/:id" element={<Animal/>}/>
      </Routes>
    </>
  );
  }

export default App
