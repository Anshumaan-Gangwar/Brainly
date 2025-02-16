import {useEffect, useState} from "react"
import {PlusIcon} from "../icons/PlusIcon.tsx"
import { ShareIcon } from "../icons/ShareIcon.tsx"
import { Card } from "../components/card"
import { CreateContentModel } from "../components/CreateContentModel.tsx"
import { Button } from "../components/Button.tsx"
import { Sidebar } from "../components/sidebar.tsx"
import { useContent } from "../hooks/useContent.tsx"

interface Content {
  type: "twitter"|"youtube";
  link: string;
  title: string;
}

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false)
  const {contents, refresh} = useContent<Content>();
  console.log("Contents:", contents, "len", contents.length);
  useEffect(()=>{
    refresh()
  },[modelOpen])
  return(
    <div>
      <Sidebar></Sidebar>
      <div className="ml-72 p-4 bg-gray-100 min-h-screen border-2">
        <CreateContentModel open={modelOpen} onClose={()=>{setModelOpen(false)}}/>
        {/* no idea why error although it is workin fine as fuck */}
        <div className="flex justify-between gap-4">
          <div className="ml-5">
            <b>All Notes</b>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => setModelOpen(true)} variant="primary" text="Add Brain" startIcon={<PlusIcon/> }> </Button>
            <Button variant="secondary" text="Share" startIcon={<ShareIcon/>} > </Button>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          {contents.length === 0 ? (
            <p>No content available</p>
          ) : (
            contents.map((content) => {
              console.log("Rendering card:", content); // Log each content item
              return (
                <Card 
                  type={content.type}
                  link={content.link}
                  title={content.title}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  )
}
