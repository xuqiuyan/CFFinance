<template>
  <div class="app-container">
      <el-form  ref="dataForm" :model="temp" label-position="left" label-width="120px" style='width: 600px; margin-left:50px;'>
        <el-form-item :label="tableOptions[0]" prop="amount">
          <span>{{temp.amount}}</span>
        </el-form-item>
        <el-form-item :label="tableOptions[1]" prop="bank">
          <span>{{temp.bank}}</span>
        </el-form-item>
        <el-form-item :label="tableOptions[2]" prop="cardNumber">
          <span>{{temp.cardNumber}}</span>      
        </el-form-item>  
        <el-form-item :label="tableOptions[3]" prop="accountName">
          <span>{{temp.accountName}}</span> 
        </el-form-item>
        <el-form-item :label="tableOptions[4]" prop="createTime">
          <span>{{temp.createTime | timeFilter}}</span> 
        </el-form-item>  
        <el-form-item :label="tableOptions[5]" prop="cashierApprovalStatus">
          <span>{{temp.cashierApprovalStatus}}</span>          
        </el-form-item>
        <el-form-item :label="tableOptions[6]" prop="cashierApprovalMessage">
          <span>{{temp.cashierApprovalMessage}}</span>
        </el-form-item>
        <el-form-item :label="tableOptions[7]" prop="cashierApprovalTime">
          <span>{{temp.cashierApprovalTime | timeFilter}}</span>
        </el-form-item>
        <el-form-item :label="tableOptions[8]" prop="cashierId">
          <span>{{temp.cashierId}}</span>    
        </el-form-item>
        <el-form-item :label="tableOptions[9]" prop="cashier">
          <span>{{temp.cashier}}</span>    
        </el-form-item>        
        <el-form-item :label="tableOptions[10]" prop="accountantApprovalStatus">
          <span>{{temp.accountantApprovalStatus}}</span>
        </el-form-item>
        <el-form-item :label="tableOptions[11]" prop="accountantApprovalMessage">
          <span>{{temp.accountantApprovalMessage}}</span>
        </el-form-item>  
        <el-form-item :label="tableOptions[12]" prop="accountantApprovalTime">
          <span>{{temp.accountantApprovalTime | timeFilter}}</span>
        </el-form-item>  
        <el-form-item :label="tableOptions[13]" prop="accountantId">
          <span>{{temp.accountantId}}</span>
        </el-form-item>
        <el-form-item :label="tableOptions[14]" prop="accountant">
          <span>{{temp.accountant}}</span>
        </el-form-item>
        <el-form-item :label="tableOptions[15]" prop="status">
          <span>{{temp.status | statusFilter}}</span>
        </el-form-item>  
        <el-form-item :label="tableOptions[16]" prop="number">
          <span>{{temp.number}}</span>
        </el-form-item>  
        <el-form-item :label="tableOptions[17]" prop="payTime">
          <span>{{temp.payTime | timeFilter}}</span>
        </el-form-item>          
      </el-form>
      <div align="center" v-if="temp.status === 1 || temp.status === 3">
        <!-- 1：待审核 3：财务通过 两种状态下需要显示 -->
        <el-button class="filter-item" type="primary"  @click="handleAccept">通过</el-button>
        <el-button class="filter-item" type="primary"  @click="dialogFormVisible = true">拒绝</el-button>
      </div>
      <el-dialog title="请填写拒绝提现原因" :visible.sync="dialogFormVisible">
        <el-form >
          <el-form-item label="拒绝原因" >
            <el-input v-model="whyReject" auto-complete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer" >
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleReject">确 定</el-button>
        </div>
      </el-dialog>
  </div>

</template>

<script>
import { fetchWithdrawInfo, withdrawAccept, withdrawReject } from '@/api/financial'
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      tableOptions: ['提现金额', '银行代码', '提现卡号', '姓名', '提现创建时间', '出纳审核状态', '出纳审核理由', '出纳审核时间', '出纳id', '出纳', '财务审核状态', '财务审核理由', '财务审核时间', '财务id', '财务', '审核状态', '打款单号', '打款时间'],
      temp: {
        id: undefined,
        amount: '',
        bank: '',
        cardNumber: '',
        accountName: '',
        createTime: '',
        cashierApprovalStatus: '',
        cashierApprovalMessage: '',
        cashierApprovalTime: '',
        cashierId: '',
        cashier: '',
        accountantApprovalStatus: '',
        accountantApprovalMessage: '',
        accountantApprovalTime: '',
        accountantId: '',
        accountant: '',
        status: '',
        number: '',
        payTime: ''
      },
      withdrawid: this.$route.query.withdrawid,
      dialogFormVisible: false,
      whyReject: ''
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '待审核',
        2: '已拒绝',
        3: '出纳审核已通过',
        4: '财务审核已通过',
        5: '已打款'
      }
      return statusMap[status]
    },
    timeFilter(time) {
      return parseTime(time)
    }
  },
  created() {
    this.getWithdrawInfo()
  },
  methods: {
    getWithdrawInfo() {
      fetchWithdrawInfo(this.withdrawid).then(response => {
        this.temp = Object.assign({}, response.data.data)
        this.listLoading = false
      })
    },
    handleAccept() {
      withdrawAccept(this.withdrawid).then(response => {
        this.$message({
          message: '审核通过',
          type: 'success'
        })
      })
    },
    handleReject() {
      this.dialogFormVisible = false
      withdrawReject(this.withdrawid, this.whyReject).then(response => {
        console.log(response.data)
        this.$message({
          message: '已提现拒绝',
          type: 'warning'
        })
      })
    }
  }
}
</script>

<style scoped>
.el-form-item{
  margin-bottom: 10px;
}
</style>

