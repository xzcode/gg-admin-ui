<template>
    <div class="page-login">
        <el-card class="login-form" shadow="always">
            <div slot="header">
                <span class="form-title">管理系统</span>
            </div>
            <el-input placeholder="请输入用户名" v-model="username">
                <template slot="prepend">
                    <i class="el-icon-user"></i>
                </template>
            </el-input>
            <div class="divider"></div>
            <el-input placeholder="请输入密码" v-model="password">
                <template slot="prepend">
                    <i class="el-icon-lock"></i>
                </template>
            </el-input>
            <div class="divider"></div>
            <el-button
                type="primary"
                style="width: 100%;"
                @click="validateForm()"
                :loading="loading"
                >登陆</el-button
            >
            <div class="divider"></div>
            <a href="#" style="float: right;">忘记密码</a>
        </el-card>

        <!--  <p class="copyright">
            Copyright
            <i aria-hidden="true" class="fa fa-copyright"></i>
            {{ yearString }} GG Projects 出品
            <el-link
                type="primary"
                target="_blank"
                href="https://github.com/xzcode/ggserver"
                >@GGServer</el-link
            >
        </p> -->

        <BgBlock />
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import BgBlock from '@/components/bg-blocks/index.vue';
import net from './net';
const {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
} = createNamespacedHelpers('login');

export default {
    components: {
        BgBlock
    },
    data() {
        return {
            username: '',
            password: ''
        };
    },
    created() {
        net.init();
    },
    computed: {
        ...mapState(['loading']),
        yearString() {
            return new Date().getFullYear();
        }
    },
    methods: {
        ...mapMutations(['submitLogin', 'updateLoading']),
        validateForm() {
            if (!this.username) {
                this.$message.error('用户名不能为空');
                return;
            }
            if (!this.password) {
                this.$message.error('密码不能为空');
                return;
            }
            this.submitLogin({
                username: this.username,
                password: this.password
            });
        }
    }
};
</script>

<style scoped lang="scss">
@import '@/css/common.scss';

.page-login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .copyright {
        z-index: -100;
        position: absolute;
        bottom: 10px;
        color: $color-info;
    }

    a {
        color: $color-primary;
        text-decoration: none;
    }
}

.login-form {
    background-color: rgba($color: #ffffff, $alpha: 0.5);
    width: 300px;
    padding: 20px 20px 50px 20px;

    .form-title {
        font-weight: bold;
        font-size: 22px;
    }

    .divider {
        height: 20px;
    }
}
</style>
