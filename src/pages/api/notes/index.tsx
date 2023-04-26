import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'

const NotesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) {
    return res.status(403).json({ message: '403: User is not logged in' })
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(401).json({ message: error })
    }

    return res.status(200).json(data)
  }
}

export default NotesApi