import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import React from "react";
import {BiSearchAlt2} from "react-icons/bi"
import {BsFilter} from "react-icons/bs"

function SearchBar() {
  const [{contactSearch},dispatch] = useStateProvider()
  return (
    <div className="flex bg-search-input-container-background py-3 pl-5 items-center gap-3 h-14">
      <div className="flex bg-panel-header-background items-center gap-5 px-3 py-1 rounded-lg flex-grow">
        <div>
          <BiSearchAlt2 className="cursor-pointer text-lg text-panel-header-icon"/>
        </div>
        <div>
          <input type="text" placeholder="Search or start a new chat" className="text-sm focus:outline-none text-white w-full bg-transparent" value={contactSearch} onChange={(e)=>dispatch({type:reducerCases.SET_CONTACT_SEARCH, contactSearch:e.target.value})}/>
        </div>
      </div>
      <div className="pr-5 pl-3">
        <BsFilter className="cursor-pointer text-lg text-panel-header-icon"/>
      </div>
    </div>
  )
}

export default SearchBar;
