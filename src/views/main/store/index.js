


import { router } from '@/router'
import dashboard from '../children/dashboard/store'

const menus = [
    {
        name: "首页",
        path: '/main/dashboard',
        icon: 'el-icon-odometer',
        children: null
    },
    {
        name: "系统管理",
        path: '/main/system-config',
        icon: 'el-icon-s-tools',
        children: null
    },
    {
        name: "测试01",
        path: '/main/test01',
        icon: 'el-icon-s-order',
        children: [
            {
                name: "选项1",
                path: '/main/test01/option01',
                children: null
            },
            {
                name: "选项2",
                path: '/main/test01/option02',
                children: null
            },
            {
                name: "/main/test01/option03",
                path: 'option03',
                children: null
            }
        ]
    },
    {
        name: "测试02",
        path: '/main/test02',
        icon: 'el-icon-star-on',
        children: null
    },
]

const matchMenu = function (path) {
    for (let i = 0; i < menus.length; i++) {
        const m = menus[i];
        if (m.path == path) {
            return m;
        }
        if (m.children) {
            return matchMenu(m.children);
        }
    }
}

const makeFullname = function (pMenus, fullnames = []) {
    for (let i = 0; i < pMenus.length; i++) {
        const m = pMenus[i];
        m.fullnames = [...fullnames];
        m.fullnames.push(m.name);
        if (m.children) {
            return makeFullname(m.children, [...m.fullnames]);
        }
    }
}

makeFullname(menus)

const store = {
    namespaced: true,
    state: {
        menus,
        leftMenu: {
            isCollapse: false
        },
        activeMenu: menus[0].path,
        tabs: [],
        selectedTab: null
    },
    mutations: {
        menuCollapse(state) {
            state.leftMenu.isCollapse = !state.leftMenu.isCollapse;
        },
        menuSelect(state, path) {
            let menu = matchMenu(path);
            if (!menu) {
                return;
            }
            state.activeMenu = menu.path;
            let selectedTab = null;
            for (const tab of state.tabs) {
                if (tab.name == path) {
                    selectedTab = tab;
                    break;
                }
            }
            if (selectedTab) {
                state.selectedTab = { ...selectedTab };
                return;
            }

            let closeable = menus[0].path != menu.path;

            selectedTab = {
                title: menu.name,
                name: menu.path,
                fullnames: menu.fullnames,
                closeable: closeable
            }

            state.selectedTab = selectedTab;
            state.tabs.push({ ...selectedTab })


        },
        tabRemove(state, path) {
            let index = 0;
            for (let i = 0; i < state.tabs.length; i++) {
                if (state.tabs[i].name == path) {
                    index = i;
                    break;
                }
            }
            state.tabs = state.tabs.filter((e, i) => path != e.name);
            state.tabs[index - 1] && (state.selectedTab = state.tabs[index - 1])
            let newPath = state.selectedTab.name;
            router.currentRoute.path != newPath && router.push(newPath);
            state.activeMenu = newPath;

        },
        tabClick(state, data) {
            router.currentRoute.path != data.name && router.push(data.name);
            state.activeMenu = data.name;
        },
        initMenu(state) {


        },
        hasTab(state, tabName) {
            for (const tab of state.tabs) {
                if (tab.name == tabName) {
                    return tab;
                }
            }
        },
        initTabs(state) {
            let menu = menus[0];
            let firstTabs = state.tabs.filter(e => e.name == menu.path);
            if(firstTabs && firstTabs.length > 0) {
                return;
            }
            state.selectedTab = {
                title: menu.name,
                name: menu.path,
                fullnames: menu.fullnames,
                closeable: false
            }
            state.tabs.push({ ...state.selectedTab })

            let initPath = router.currentRoute.path;

            if (initPath && initPath != '') {
                this.commit('main/menuSelect', initPath)
            }

        }
    },
    actions: {
        testAction(context) {

        },
    },
    getters: {},
    modules: {
        dashboard
    }
}



export const mappedComponent = {

    computed: {
    }

}


export default store