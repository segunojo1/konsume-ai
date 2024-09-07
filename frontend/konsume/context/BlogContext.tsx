import React, { createContext, useEffect, useRef, useState } from 'react';
import { MainLayoutContextProps } from '../@types';
import Cookies from 'js-cookie';
import { axiosKonsumeInstance } from '@/http/konsume';
import { retry } from '@/helpers/retryapi';

const BlogContext = createContext({} as any);
export default BlogContext;

export function BlogContextProvider({ children }: { children: React.ReactNode }) {
    const [activePage, setActivePage] = useState('home');
    const [toggled, setToggled] = useState<boolean>(false);
    const [userMessage, setUserMessage] = useState('');
    const [name, setName] = useState<string | undefined>();
    const [blogs, setBlogs] = useState([]);
    const [tempBlogs, setTempBlogs] = useState(blogs);
    const [showModal, setShowModal] = useState(false);
    const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
    const [tempBookmarks, setTempBookmarks] = useState(bookmarkedBlogs);

    const dataFetchedRef = useRef(false);
    useEffect(() => {

        const username = Cookies.get('konsumeUsername')
        setName(username)
    }, [])

    useEffect(() => {
        console.log('hi');

        const fetchBlogs = async () => {
            console.log('fetching blogs');
            try {

                const { data } = await axiosKonsumeInstance.get('/api/Blog/GenerateAllBlogs');
                console.log(data);

                setBlogs(data.content);
                setTempBlogs(data.content)

                if (data.content.length < 2) {
                    console.log('Retrying due to insufficient blog data...');
                    await retry(fetchBlogs);
                } else {
                    console.log('Blogs fetched successfully:', data.content);
                    localStorage.setItem('blogs', JSON.stringify(data.content));
                }
            } catch (error) {
                localStorage.removeItem('lastFetchBlogsDate');
                console.error('Fetch blog Error:', error);
            }
        };

        const checkAndFetchBlogs = async () => {
            const lastFetchDate = localStorage.getItem('lastFetchBlogsDate');
            const today = new Date().toISOString().split('T')[0];

            if (lastFetchDate !== today) {
                await fetchBlogs();
                localStorage.setItem('lastFetchBlogsDate', today);
            } else {
                const cachedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
                setBlogs(cachedBlogs);
                setTempBlogs(cachedBlogs)
            }

        };

        if (!dataFetchedRef.current) {
            checkAndFetchBlogs();
            dataFetchedRef.current = true;
        }
    }, [setBlogs, blogs]);

    const contextValue: any = {
        activePage,
        setActivePage,
        toggled,
        setToggled,
        userMessage,
        setUserMessage,
        name,
        tempBlogs,
        blogs,
        setTempBlogs,
        showModal, 
        setShowModal,
        bookmarkedBlogs, 
        setBookmarkedBlogs,
        tempBookmarks, 
        setTempBookmarks
    };

    return <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>;
}
