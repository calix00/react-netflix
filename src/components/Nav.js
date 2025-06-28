import React, { useEffect, useState, useRef } from 'react'
import './Nav.css'
import { useNavigate, useLocation } from 'react-router-dom';

export default function Nav() {

  const [show, setshow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navigate =  useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    window.addEventListener('scroll', () => {
      console.log('window.scrollY', window.scrollY);
      if (window.scrollY > 50) {
        setshow(true);
      } else {
        setshow(false);
      }
    });
    
    return () => {
      window.removeEventListener('scroll', () => {} );
    };
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }

  const handleClick = () => {
    if (location.pathname === '/') {
      window.location.reload(); 
    } else {
      navigate('/');
    }
  }

  const handleSearchClick = () => {
    setShowSearch(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearch && searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);



  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    if (dropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <nav className={`nav ${show && 'nav_black'}`}>
      <img
        alt='Netflix logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png'
        className='nav_logo'
        onClick={handleClick}
      />

      <div className="nav_icons_container">
        {!showSearch && (
          <span className="material-icons nav_icon" onClick={handleSearchClick}>search</span>
        )}
        {showSearch && (
          <div className='nav_search_container' ref={searchRef}>
            <span className="material-icons nav_input_icon">search</span>
            <input 
            ref={inputRef}
              value={searchValue} 
              onChange={handleChange} 
              className='nav_input' 
              type='text'
              placeholder='제목, 사람, 장르'
            />
          </div>
        )}
        <span className="material-icons nav_icon">notifications</span>
        <div className='nav_avatar_container' ref={dropdownRef}>
          <img
            alt='User logged'
            src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41'
            className='nav_avatar'
            onClick={toggleDropdown}
          />
          {dropdownVisible && (
            <div className="nav_dropdown">
              <p>프로필 관리</p>
              <p>프로필 이전</p>
              <p>계정</p>
              <p>고객센터</p>
              <p>넷플릭스에서 로그아웃</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
