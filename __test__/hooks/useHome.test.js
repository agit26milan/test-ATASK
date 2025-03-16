import axios from 'axios';
import MockAdapter from "axios-mock-adapter";
import useHome from '../../src/screens/home/hooks/useHome'
import { act, renderHook, waitFor } from "@testing-library/react";

const mockResponseList = [
    {
        "login": "agit26milan",
        "id": 36707967,
        "node_id": "MDQ6VXNlcjM2NzA3OTY3",
        "avatar_url": "https://avatars.githubusercontent.com/u/36707967?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/agit26milan",
        "html_url": "https://github.com/agit26milan",
        "followers_url": "https://api.github.com/users/agit26milan/followers",
        "following_url": "https://api.github.com/users/agit26milan/following{/other_user}",
        "gists_url": "https://api.github.com/users/agit26milan/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/agit26milan/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/agit26milan/subscriptions",
        "organizations_url": "https://api.github.com/users/agit26milan/orgs",
        "repos_url": "https://api.github.com/users/agit26milan/repos",
        "events_url": "https://api.github.com/users/agit26milan/events{/privacy}",
        "received_events_url": "https://api.github.com/users/agit26milan/received_events",
        "type": "User",
        "user_view_type": "public",
        "site_admin": false,
        "score": 1,
    }
]


describe('useHome hooks should run correctly', () => {
    const username = 'agit26milan'
    let mockAxios;
    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
    });
    afterEach(() => {
        mockAxios.reset(); 
    });

    test('fetchListUser should run correctly', async () => {
        const { result } = renderHook(() => useHome());
        act(() => {
            result.current.fetchListRepo(username)
        })
        expect(result.current.isFetching).toBeTruthy()
        await waitFor(() => {
            expect(result.current.isFetching).toBeFalsy()
            expect(result.current.listUser).toHaveLength(1)
            expect(result.current.listUser).toEqual(mockResponseList)
        })
    })

    test('onSelectusername should run correctly', async () => {
        const { result } = renderHook(() => useHome());
        act(() => {
            result.current.fetchListRepo(username)
            result.current.onSelectUsername(username)
        }) 
        await waitFor(() => {
            expect(result.current.listUser).toHaveLength(1)
            expect(result.current.listUser).toEqual(mockResponseList)
        })
    })

    test('handleExpandedItem should run correctly', async () => {
        const { result } = renderHook(() => useHome());
        act(() => {
            result.current.setListUser(mockResponseList)
        }) 
        const expandMockList = mockResponseList?.map((data) => ({...data, isExpanded: true}))
        await waitFor(() => {
            result.current.handleExpandedItem(username)
        })
        await waitFor(() => {
            expect(result.current.listUser).toEqual(expandMockList)
        })
    })
})

