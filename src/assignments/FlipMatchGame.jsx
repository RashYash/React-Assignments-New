import React, { useState } from "react";
import "./FlipMatchGame.css";

const DATA = [
  {
    label: "Nature",
    icon: "☘️",
    items: ["☘️", "🏕️", "🌿", "🌲", "🌳", "🌾", "🌴", "🍃"],
  },
  {
    label: "Foods",
    icon: "🍔",
    items: ["🍔", "🥤", "🥗", "🍗", "🍟", "🥓", "🥞", "🍲"],
  },
  {
    label: "Animals",
    icon: "🐹",
    items: ["🐹", "🦊", "🦁", "🦓", "🐱", "🐶", "🐯", "🐼"],
  },
  {
    label: "Dessert",
    icon: "🧁",
    items: ["🍧", "🍨", "🧁", "🍰", "🍫", "🍩", "🍦", "🍹"],
  },
];

export default function FlipMatchGame() {
  const [cards, setCards] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  const shuffleCards = (items) => {
    const doubled = [...items, ...items];

    return doubled
      .map((item, index) => ({
        id: index + Math.random(),
        value: item,
      }))
      .sort(() => Math.random() - 0.5);
  };

  const handleLabelClick = (category) => {
    if (selectedLabel === category.label) {
      setCards(shuffleCards(category.items));
      setFlipped([]);
      setMatched([]);
      return;
    }

    setSelectedLabel(category.label);
    setCards(shuffleCards(category.items));
    setFlipped([]);
    setMatched([]);
  };

  const handleCardClick = (card) => {
    if (
      flipped.length === 2 ||
      flipped.includes(card.id) ||
      matched.includes(card.value)
    )
      return;

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const first = cards.find((c) => c.id === newFlipped[0]);
      const second = cards.find((c) => c.id === newFlipped[1]);

      if (first.value === second.value) {
        setMatched((prev) => [...prev, first.value]);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 800);
      }
    }
  };

  return (
    <div className="flipmatch-app">
      <div className="flipmatch-box">
        <div className="flipmatch-categories">
          {DATA.map((cat) => (
            <button
              key={cat.label}
              className={
                selectedLabel === cat.label
                  ? "flipmatch-category flipmatch-active"
                  : "flipmatch-category"
              }
              onClick={() => handleLabelClick(cat)}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        <div className="flipmatch-grid">
          {cards.map((card) => {
            const isFlipped =
              flipped.includes(card.id) || matched.includes(card.value);

            const isMatched = matched.includes(card.value);

            return (
              <div
                key={card.id}
                className="flipmatch-card"
                onClick={() => handleCardClick(card)}
              >
                <div
                  className={`flipmatch-inner ${
                    isFlipped ? "flipmatch-flip" : ""
                  } ${isMatched ? "flipmatch-matched" : ""}`}
                >
                  <div className="flipmatch-front"></div>

                  <div className="flipmatch-back">{card.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
