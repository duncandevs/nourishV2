import { supabase } from "../../clients/supabase";

const fetchExercises = () => {
    return supabase
        .from('exercise')
        .select('*')
};

export default {
    fetchExercises
};