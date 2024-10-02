import { StickyNote } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import DocumentOptions from "./DocumentOptions";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { toast } from "@/hooks/use-toast";

function DocumentList({ documentList, params }) {
    const router = useRouter();
    
    const DeleteDocument = async (docId)=>{
        await deleteDoc(doc(db, "workspacedocuments", docId));
        toast('Deleted Document !');
    }
    console.log(params);
    return (
        <div>
            {documentList.map((doc, index) => {
                return (
                    <div
                        key={index}
                        onClick={() => {
                            // Navigate to the document's workspace and ID
                            router.push('/workspace/' + params?.workspaceid + '/' + doc?.id);
                        }}
                    >
                        <div
                            className={`relative flex justify-between items-center gap-3 p-2 px-3 mt-3 rounded-lg cursor-pointer hover:bg-gray-200
                                ${doc?.id == params?.documentid && 'bg-white'}
                            `}
                        >
                            {/* Render StickyNote icon if no Emoji is present */}
                            {!doc.Emoji && <StickyNote className="w-[20px] h-[20px]" />}
                            
                            {/* Display document name and Emoji */}
                            <h2 className="flex gap-2">
                                {doc?.Emoji} {doc.documentName}
                            </h2>
                            <DocumentOptions className="mt-5" doc={doc} deleteDocument={(docId)=>DeleteDocument(docId)}/>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default DocumentList;
