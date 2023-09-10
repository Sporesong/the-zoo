import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import React from "react";

const Animal = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<IAnimal | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const animalItem = localStorage.getItem("animals");
    if (animalItem) {
      const animals: IAnimal[] = JSON.parse(animalItem);
      const selectedAnimal = animals.find((animal) => animal.id.toString() === id);
      if (selectedAnimal) {
        setAnimal(selectedAnimal);
        setButtonDisabled(selectedAnimal.buttonDisabled || false);
      }
    }
  }, [id]);

  const handleFeedClick = () => {
    if (animal && !buttonDisabled) {
        setButtonDisabled(true)
        const lastFedTime = new Date().toISOString();
        updateLocalStorage(animal.id, {...animal, lastFed: lastFedTime, isFed: true, buttonDisabled: true});
    }
  };

  const updateLocalStorage = (animalId: number, updatedAnimal: IAnimal) => {
    const animalItem = localStorage.getItem("animals");
    if (animalItem) {
        const animals: IAnimal[] = JSON.parse(animalItem);
        const updatedAnimals = animals.map((animal) => animal.id === animalId ? updatedAnimal: animal);
        console.log("Updating local storage");
        localStorage.setItem("animals", JSON.stringify(updatedAnimals));
        setAnimal(updatedAnimal);
    }
  };

  if (!animal) {
    return (
      <div>
        No animal was found
      </div>
    );
  }

  return (
    <>
      <div className="animal">
        <img src={animal.imageUrl} alt="ett djur" width={400} />
        <h2>{animal.name}</h2>
        <p>Vetenskapligt namn: {animal.latinName}</p>
        <p>Beskrivning: {animal.longDescription}</p>
        <p>Senast matad: {animal.lastFed}</p>
        <p>Mätt och belåten: {animal.isFed ? "Ja" : "Nej"}</p>
        <button onClick={handleFeedClick} disabled={buttonDisabled}>Mata djur</button>
      </div>
    </>
  );
};

export default Animal;
