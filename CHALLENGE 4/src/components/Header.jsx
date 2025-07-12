import { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Header({ search, setSearch }) {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  // Show input and focus when icon is clicked
  const handleIconClick = () => {
    setShowInput(true);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };

  // Hide input if empty on blur
  const handleBlur = () => {
    if (!search) setShowInput(false);
  };

  return (
    <header className="app-header">
      <h1>🎙️ Podcast App</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search podcasts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        onBlur={handleBlur}
        className={`header-search-input${showInput ? '' : ' slide-hidden'}`}
      />
      {!showInput && (
        <button
          aria-label="Show search"
          onClick={handleIconClick}
          className="header-search-btn"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      )}
    </header>
  );
}
