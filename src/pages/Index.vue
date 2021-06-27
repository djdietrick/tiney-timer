<template>
  <q-page class="flex flex-center">
    <div class="container">
      <div class="header">
        <q-btn outline icon="add" class="header__btn" color="green-13" @click="addTimer"></q-btn>
      </div>
      <div class="timers">
        <div v-for="(timer, i) in timers" :key="i" class="timer">
          <q-input borderless placeholder="Name" v-model="timer.name"></q-input>
          <p class="timer__time">{{formatTime(timer.secs)}}</p>
          <div class="timer__btns">
            <div v-if="timer.confirm" class="grid--two q-gutter-sm">
              <q-btn outline icon="done" color="green-13" @click="deleteTimer(i)" size="sm"></q-btn>
              <q-btn outline icon="close" color="red-9" @click="timer.confirm=false" size="sm"></q-btn>
            </div>
            <div v-else class="q-gutter-sm grid--three">
              <q-btn outline :icon="timer.active ? 'pause' : 'play_arrow'" color="orange-9" 
                @click="toggleTimer(i)" size="xs" padding="sm"></q-btn>
              <q-btn outline icon="restart_alt" color="orange-9" @click="resetTimer(i)" size="xs" padding="sm"></q-btn>
              <q-btn outline icon="delete" color="orange-9" @click="timer.confirm=true" size="xs" padding="sm"></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import * as moment from 'moment';
export default {
  name: 'PageIndex',
  data() {
    return {
      timers: [],
      newTimer: ''
    }
  },
  methods: {
    addTimer() {
      this.timers.push({
        name: '',
        active: false,
        secs: 0,
        confirm: false
      })
    },
    toggleTimer(i) {
      this.timers[i].active = !this.timers[i].active;
    },
    deleteTimer(i) {
      this.timers.splice(i, 1);
    },
    resetTimer(i) {
      this.timers[i].secs = 0;
    },
    formatTime(s) {
      if(s > 3600) {
        return moment("2015-01-01").startOf('day')
          .seconds(s)
          .format('H:mm:ss');
      } else {
        return moment("2015-01-01").startOf('day')
          .seconds(s)
          .format('m:ss');
      }
    },
    incrementTimers() {
      for(let timer of this.timers) {
        if(timer.active) timer.secs++;
      }
    }
  },
  created() {
    this.$q.dark.set(true);
    setInterval(() => {
      this.incrementTimers();
    }, 1000)
  }
}
</script>

<style lang="scss">
.container {
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 3rem 1fr;
}
.header {
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;

  &__btn {
    width: 85%;
    border-radius: 0.3rem;
  }
}
.timers {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}
.timer {
  width: 90%;
  margin-left: 1rem;
  margin-right: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;

  &__time {
    display: inline-block;
    margin: 0 0;
    font-size: 1.4rem;
  }
}
.grid--two {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.grid--three {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
