import axios from "axios"

export const addProduct = async(req, res) => {
    try {
        // Forward the request body and headers to the external API
        const response = await axios.post('https://eureka.innotrat.in/product', req.body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Send the response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling external API:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.message || 'An error occurred',
        });
    }
}


export const checkDeviceRunning = async(req, res) => {
    try {
        // Forward the request body and headers to the external API
        const response = await axios.post('https://eureka.innotrat.in/devices/running', req.body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Send the response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling external API:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.message || 'An error occurred',
        });
    }
}


export const getProductDefinition = async(req, res) => {
    try {
        // Forward the request body and headers to the external API
        const response = await axios.get('https://eureka.innotrat.in/product/61630893-6873-456c-bc38-b9d7eb7bcedb/definition', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Send the response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling external API:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.message || 'An error occurred',
        });
    }
}

export const addNewProductDefinition = async(req, res) => {
    try {
        // Forward the request body and headers to the external API
        const response = await axios.post('https://eureka.innotrat.in/product/61630893-6873-456c-bc38-b9d7eb7bcedb/definition', req.body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Send the response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling external API:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.message || 'An error occurred',
        });
    }
}


export const updateProductDefinition = async(req, res) => {
    try {
        // Forward the request body and headers to the external API
        const response = await axios.patch('https://eureka.innotrat.in/product/61630893-6873-456c-bc38-b9d7eb7bcedb/components', req.body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Send the response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling external API:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.message || 'An error occurred',
        });
    }
}


export const deleteProductDefinition = async(req, res) => {
    try {
        // Forward the request body and headers to the external API
        const response = await axios.delete('https://eureka.innotrat.in/product/61630893-6873-456c-bc38-b9d7eb7bcedb/definition', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Send the response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling external API:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.message || 'An error occurred',
        });
    }
}


export const startDevice = async(req, res) => {
    try {
        // Forward the request body and headers to the external API
        const response = await axios.post('https://eureka.innotrat.in/product/61630893-6873-456c-bc38-b9d7eb7bcedb/devices/control', req.body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Send the response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling external API:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.message || 'An error occurred',
        });
    }
}

export const stopDevice = async(req, res) => {
    try {
        // Forward the request body and headers to the external API
        const response = await axios.post('https://eureka.innotrat.in/product/61630893-6873-456c-bc38-b9d7eb7bcedb/devices/control', req.body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Send the response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling external API:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.message || 'An error occurred',
        });
    }
}

export const generataData = async(req, res) => {
    try {
        // Forward the request body and headers to the external API
        const response = await axios.post('https://eureka.innotrat.in/generate_data', req.body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Send the response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling external API:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.message || 'An error occurred',
        });
    }
}


export const getAllData = async(req, res) => {
    try {
        // Forward the request body and headers to the external API
        const response = await axios.post('https://eureka.innotrat.in/get_data', req.body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Send the response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling external API:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.message || 'An error occurred',
        });
    }
}