import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', phone: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', phone: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', phone: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', phone: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactLS = JSON.parse(localStorage.getItem('contacts')) || [];

    if (contactLS.length > 0) {
      this.setState({ contacts: contactLS });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  isContactDuplicate = (name, phone) => {
    return this.state.contacts.some(
      contact => contact.name === name || contact.phone === phone
    );
  };

  handleAddContact = newContact => {
    const { name, phone } = newContact;

    const isDuplicateContact = this.isContactDuplicate(name, phone);

    if (isDuplicateContact) {
      alert('Contact with the same name and phone number already exists!');
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { ...newContact, id: nanoid() }],
    }));
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilterChange = filterValue => {
    this.setState({ filter: filterValue });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <ContactForm
          onAddContact={this.handleAddContact}
          onSubmit={this.handleAddContact}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
        <Filter value={filter} onChange={this.handleFilterChange} />
      </div>
    );
  }
}

export default App;