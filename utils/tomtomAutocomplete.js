import axios from 'axios';

const TOMTOM_API_KEY = 'OgbS6kgs2ZtkGGt0GjNYAXPdsGVYiBA1';

export const getAutocompleteResults = async (query) => {
    try {
        const response = await axios.get('https://api.tomtom.com/search/2/search/' + encodeURIComponent(query) + '.json', {
            params: {
                key: TOMTOM_API_KEY,
                limit: 6,
                countrySet: 'IN',
            }
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching autocomplete results:', error);
        return [];
    }
};