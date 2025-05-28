
import { User as SupabaseUser } from "@supabase/supabase-js";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export const transformSupabaseUser = (user: SupabaseUser): AppUser => ({
  id: user.id,
  name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
  email: user.email || '',
  phone: user.user_metadata?.phone || undefined
});
