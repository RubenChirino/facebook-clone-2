import { useEffect, useState } from "react";
import { getData } from "../../helpers/utils";

// Icons
import { DotsHorizontalIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/outline";
import Contact from "../Contact/contact";

function Widgets() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    getData(`http://localhost:3000/api/data`).then((data) => {
      setContacts(data.contacts);
    });
  }, []);

  return (
    <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <h2 className="text-xl">Contacts</h2>
        <div className="flex space-x-2">
          <VideoCameraIcon className="h-6" />
          <SearchIcon className="h-6" />
          <DotsHorizontalIcon className="h-6" />
        </div>
      </div>
      {contacts?.map((contact) => (
        <Contact key={contact.src} src={contact.src} name={contact.name} />
      ))}
    </div>
  );
}

export default Widgets;
