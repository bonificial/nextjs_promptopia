'use client'
import Form from "@components/Form";
import {useState} from "react";
import {useSession} from "next-auth/react";
import { useRouter } from "next/navigation";

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const {data:session } = useSession();
    const router = useRouter();
    const [post, setPost] = useState({
        prompt: '', tags: ''
    })
    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true)
console.log('requesting with ',{
    prompt: post.prompt,
    tag: post.tag,
    userId: session?.user.id,
})
        try {
            const response = await fetch("/api/prompt/new", {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user.id,
                })
            })
            if (response.ok) {
                router.push('/')
            }
        } catch (e) {
            console.log(e);

        } finally {
            setSubmitting(false)
        }
    }
    return (
        <Form type={'Create'} post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt}/>
    )
}
export default CreatePrompt
