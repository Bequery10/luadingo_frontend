import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route , Navigate ,useNavigate } from 'react-router-dom';

// Make sure all these imports are correct and that these files exist in your project under the specified paths
import AdminPage from './components/AdminPage';
import UserListPage from './components/UserListPage';
import RunSqlCommandsPage from './components/RunSqlCommandsPage';
import LogInSignIn from './components/LogInSignIn';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
import LeaderboardPage from './components/LeaderboardPage';
import FriendsPage from './components/FriendsPage';
import SettingsPage from './components/SettingsPage';
import CoursesPage from './components/CoursesPage';
import QuizzesPage from './components/QuizzesPage';
import QuestionsPage from './components/QuestionsPage';
import FriendsForFriends from './components/FriendsForFriends';
import FriendsAccountsPage from './components/FriendsAccountsPage';
import UserProfileForFriends from './components/UserProfileForFriends';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LogInSignIn />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/userProfileForFriends" element={<UserProfileForFriends />} />
          <Route path="/friendsAccounts" element={<FriendsAccountsPage />} />
          <Route path="/friendsForFriends" element={<FriendsForFriends />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/user-list" element={<UserListPage />} />
          <Route path="/sql-commands" element={<RunSqlCommandsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;