import { Button } from "./ui/button";
import { Check, X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Dialog from '@radix-ui/react-dialog'

export function CreateTagForm() {
  // fazendo validacao de formulario 
  const createTagSchema = z.object({
    title: z.string().min(3, { message: 'Minimum 03 characters.' }),
    slug: z.string()
  })

  // inferencia de tipo a partir de uma variavel existente
  type CreateTagSchema = z.infer<typeof createTagSchema>

  function getSlugFromString(input: string): string {
    return  input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  }

  const { register, handleSubmit, watch, formState } = useForm<CreateTagSchema>({
    resolver: zodResolver(createTagSchema)
  })

 async function createTag({title, slug, }: CreateTagSchema) {

  await new Promise(resolve => setTimeout(resolve, 2000))

   await fetch('http://localhost:3333/tags', {
    method: 'Post',
    body: JSON.stringify({
      title,
      slug, 
      amountOfVideos: 0,
    })
   })
  }
  const generateSlug =  watch('title') ? getSlugFromString(watch('title')) : ''

  return (
    <form onSubmit={handleSubmit(createTag)} className="w-full space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="title">Tag name</label>
        <input
          {...register('title')}
          className="border border-zinc-800 rounded-lg px-3 px-y bg-zinc-800/50 w-full"
          id="name"
          type="text"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="slug">Slug</label>
        <input
          {...register('slug')}
          className="border border-zinc-800 rounded-lg px-3 px-y bg-zinc-800/50 w-full"
          id="slug"
          type="text"
          value={generateSlug}
          readOnly />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Dialog.Close asChild>
          <Button>
            <X className="size-3" />
            Cancel
          </Button>
        </Dialog.Close>
        <Button disabled={formState.isSubmitting} className=" bg-teal-400 text-teal-950" type="submit">
          {formState.isSubmitting ? <Loader2 className='size-3' /> :  <Check className="size-3" />}
          Save
        </Button>
      </div>
    </form>
  )
}