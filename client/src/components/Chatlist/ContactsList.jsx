import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatLIstItem from "./ChatLIstItem";

function ContactsList() {
  const [allContacts, setAllContacts] = useState([]);
  const [{}, dispatch] = useStateProvider();
  const [searchTerm, setSearchTerm] = useState("")
  const [searchContacts, setSearchContacts] = useState([])

  useEffect(() => {
    if (searchTerm.length) {
      const filteredData = {}
      Object.keys(allContacts).forEach((key) => {
        filteredData[key] = allContacts[key].filter((obj)=> 
        obj.name.toLowerCase().includes(searchTerm.toLowerCase()))
      })
      setSearchContacts(filteredData)
    } else {
      setSearchContacts(allContacts)
    }
  }, [searchTerm])
  

  useEffect(() => {
    const getContacts = async () => {
      try {
        const { data: { users } } = await axios.get(GET_ALL_CONTACTS);
        setAllContacts(users);
        setSearchContacts(users)
      } catch (err) {
        console.log(err);
      }
    };
    getContacts();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="h-24 flex items-end px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack className="text-xl cursor-pointer" onClick={() => dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })} />
          <span>New Chat</span>
        </div>
      </div>
      <div className="bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar">
        <div className="flex py-3 gap-3 h-14 items-center">
          <div className="flex bg-panel-header-background items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-4">
            <div>
              <BiSearchAlt2 className="cursor-pointer text-lg text-panel-header-icon" />
            </div>
            <div>
              <input type="text" placeholder="Search Contacts" className="text-sm focus:outline-none text-white w-full bg-transparent" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
          </div>
        </div>
				{
					Object.entries(searchContacts).map(([initialLetter,usersList]) => {
						return (
              <>
              {usersList.length>0 &&
							<div key={Date.now()+initialLetter}>
								<div className="pl-10 py-5 text-teal-light">{initialLetter}</div>
								{
                  usersList.map(contact => {
                    return (
                      <ChatLIstItem data = {contact} isContactsPage = {true} key={contact.id}/>
                      )
                    })
                  }
							</div>
              }
              </>
						)
					})
				}
      </div>
    </div>
  );
}

export default ContactsList;
